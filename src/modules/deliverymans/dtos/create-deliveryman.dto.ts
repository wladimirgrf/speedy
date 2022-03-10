import { IsString, MinLength, IsLowercase } from 'class-validator';
import { Deliveryman } from '../entities/deliverymana.entity';

export class CreateDeliverymanDto extends Deliveryman {
  @IsString()
  @IsLowercase()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}
