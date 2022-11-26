import { Status } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateDeliveryDto {
  @IsEnum(Status)
  status: Status;
}
