import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User, UserDecorator } from 'src/decorators/user.decorator';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dtos/create-delivery.dto';
import { UpdateDeliveryDto } from './dtos/update-delivery.dto';
import { Delivery } from './entities/delivery.entity';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @UseGuards(AuthGuard('client'))
  @Post()
  create(
    @User() user: UserDecorator,
    @Body() { item_name }: CreateDeliveryDto,
  ): Promise<Delivery> {
    return this.deliveriesService.create({
      id_client: user.id,
      item_name,
    });
  }

  @UseGuards(AuthGuard(['client', 'deliveryman']))
  @Get()
  findAll(@User() user: UserDecorator): Promise<Delivery[]> {
    return this.deliveriesService.findAll(user.id);
  }

  @UseGuards(AuthGuard('deliveryman'))
  @Get('open')
  findOpenDeliveries(): Promise<Delivery[]> {
    return this.deliveriesService.findOpenDeliveries();
  }

  @UseGuards(AuthGuard(['client', 'deliveryman']))
  @Get(':id')
  findById(
    @Param('id') id: string,
    @User() user: UserDecorator,
  ): Promise<Delivery> {
    return this.deliveriesService.findById(id, user.id);
  }

  @UseGuards(AuthGuard(['deliveryman']))
  @Put(':id')
  update(
    @Param('id') id: string,
    @User() user: UserDecorator,
    @Body() { status }: UpdateDeliveryDto,
  ): Promise<Delivery> {
    return this.deliveriesService.update(id, user.id, { status });
  }
}
