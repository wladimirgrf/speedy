import { Prisma, Status } from '@prisma/client';

export class Delivery implements Prisma.DeliveryUncheckedCreateInput {
  id?: string;
  item_name: string;
  status?: Status;

  created_at?: string | Date;
  updated_at?: string | Date;

  id_client: string;
  id_deliveryman?: string;
}
