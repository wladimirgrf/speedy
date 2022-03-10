import { Prisma } from '@prisma/client';

export type DeliverymanCreateInput = Prisma.DeliverymanCreateInput;
export type DeliverymanUpdateInput = Prisma.DeliverymanUpdateInput;

export class Deliveryman implements Prisma.DeliverymanUncheckedCreateInput {
  id?: string;
  username: string;
  password: string;

  deliveries?: Prisma.DeliveryUncheckedCreateNestedManyWithoutDeliverymanInput;
}
