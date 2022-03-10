import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';
import { Deliveryman } from '../entities/deliverymana.entity';

export class CreateDeliverymanDto extends Deliveryman {
  @IsString()
  @Transform((username) => username.value.toLowerCase())
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}
