import { IsString } from 'class-validator';

export class CreateDeliveryDto {
  @IsString()
  item_name: string;

  @IsString()
  id_client: string;
}
