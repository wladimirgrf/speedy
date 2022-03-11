import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DeliverymansService } from './deliverymans.service';
import { CreateDeliverymanDto } from './dtos/create-deliveryman.dto';
import { UpdateDeliverymanDto } from './dtos/update-deliveryman.dto';
import {
  CreateAuthDto,
  CreateDeliverymanTokenDto,
} from './dtos/auth-deliveryman.dto';
import { Deliveryman } from './entities/deliverymana.entity';
import { AuthGuard } from '@nestjs/passport';
import { DeliverymansAuthService } from './deliverymans.auth.service';
import { User, UserDecorator } from 'src/decorators/user.decorator';

@Controller('deliverymans')
export class DeliverymansController {
  constructor(
    private readonly deliverymansService: DeliverymansService,
    private readonly deliverymansAuthService: DeliverymansAuthService,
  ) {}

  @Post('authenticate')
  @HttpCode(HttpStatus.OK)
  login(
    @Body() { username, password }: CreateAuthDto,
  ): Promise<CreateDeliverymanTokenDto> {
    return this.deliverymansAuthService.login(username, password);
  }

  @Post()
  create(
    @Body() createDeliverymanDto: CreateDeliverymanDto,
  ): Promise<Deliveryman> {
    return this.deliverymansService.create(createDeliverymanDto, {
      password: false,
    });
  }

  @UseGuards(AuthGuard('deliveryman'))
  @Get()
  findById(@User() user: UserDecorator): Promise<Deliveryman> {
    return this.deliverymansService.findById(user.id, { password: false });
  }

  @UseGuards(AuthGuard('deliveryman'))
  @Patch()
  update(
    @User() user: UserDecorator,
    @Body() updateDeliverymanDto: UpdateDeliverymanDto,
  ): Promise<Deliveryman> {
    return this.deliverymansService.update(user.id, updateDeliverymanDto, {
      password: false,
    });
  }

  @UseGuards(AuthGuard('deliveryman'))
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@User() user: UserDecorator): Promise<void> {
    await this.deliverymansService.remove(user.id);
  }
}
