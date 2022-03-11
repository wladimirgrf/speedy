import { IsString } from 'class-validator';
import { Delivery } from '../entities/delivery.entity';

export class CreateDeliveryDto extends Delivery {
  @IsString()
  item_name: string;
}
