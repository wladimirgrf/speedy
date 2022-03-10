import { Prisma } from '@prisma/client';

export type ClientCreateInput = Prisma.ClientCreateInput;

export class Client implements Prisma.ClientUncheckedCreateInput {
  id?: string;
  username: string;
  password: string;

  deliveries?: Prisma.DeliveryUncheckedCreateNestedManyWithoutClientInput;
}
