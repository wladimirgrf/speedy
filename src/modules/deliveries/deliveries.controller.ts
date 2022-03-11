import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User, UserDecorator } from 'src/decorators/user.decorator';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dtos/create-delivery.dto';
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
}
