import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConflictError } from 'src/errors/ConflictError';

import { DatabaseService } from 'src/database/database.service';
import { CreateDeliverymanDto } from './dtos/create-deliveryman.dto';
import { UpdateDeliverymanDto } from './dtos/update-deliveryman.dto';
import {
  Deliveryman,
  DeliverymanCreateInput,
  DeliverymanUpdateInput,
} from './entities/deliverymana.entity';
import {
  DeliverymanSelect,
  deliverymanDefaultSelect,
} from './dtos/select-deliveryman.dto';

@Injectable()
export class DeliverymansService {
  constructor(private readonly database: DatabaseService) {}

  async create(
    createDeliverymanDto: CreateDeliverymanDto,
    deliverymanSelect?: DeliverymanSelect,
  ): Promise<Deliveryman> {
    const select = { ...deliverymanDefaultSelect, ...deliverymanSelect };

    const deliverymanAlreadyExists = await this.database.deliveryman.findUnique(
      {
        where: { username: createDeliverymanDto.username },
        select,
      },
    );

    if (deliverymanAlreadyExists) {
      throw new ConflictError('This username is already being used.');
    }

    const deliveryman: DeliverymanCreateInput = {
      ...createDeliverymanDto,
      password: await bcrypt.hash(createDeliverymanDto.password, 10),
    };

    return this.database.deliveryman.create({ data: deliveryman });
  }

  findAll(deliverymanSelect?: DeliverymanSelect): Promise<Deliveryman[]> {
    const select = { ...deliverymanDefaultSelect, ...deliverymanSelect };
    return this.database.deliveryman.findMany({ select });
  }

  findById(
    id: string,
    deliverymanSelect?: DeliverymanSelect,
  ): Promise<Deliveryman> {
    const select = { ...deliverymanDefaultSelect, ...deliverymanSelect };
    return this.database.deliveryman.findUnique({ where: { id }, select });
  }

  findByUsername(
    username: string,
    deliverymanSelect?: DeliverymanSelect,
  ): Promise<Deliveryman> {
    const select = { ...deliverymanDefaultSelect, ...deliverymanSelect };
    return this.database.deliveryman.findUnique({
      where: { username },
      select,
    });
  }

  async update(
    id: string,
    updateDeliverymanDto: UpdateDeliverymanDto,
    deliverymanSelect?: DeliverymanSelect,
  ): Promise<Deliveryman> {
    const select = { ...deliverymanDefaultSelect, ...deliverymanSelect };

    const deliveryman: DeliverymanUpdateInput = {
      ...updateDeliverymanDto,
      password: await bcrypt.hash(updateDeliverymanDto.password, 10),
    };

    return this.database.deliveryman.update({
      where: { id },
      data: deliveryman,
      select,
    });
  }

  remove(id: string, deliverymanSelect?: DeliverymanSelect) {
    const select = { ...deliverymanDefaultSelect, ...deliverymanSelect };
    return this.database.deliveryman.delete({ where: { id }, select });
  }
}
