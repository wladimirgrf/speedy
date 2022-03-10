import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConflictError } from 'src/errors/ConflictError';

import { DatabaseService } from 'src/database/database.service';
import { CreateDeliverymanDto } from './dtos/create-deliveryman.dto';
import { UpdateDeliverymanDto } from './dtos/update-deliveryman.dto';
import {
  Deliveryman,
  DeliverymanCreateInput,
} from './entities/deliverymana.entity';
import {
  DeliverymanColumnsToReturn,
  deliverymanDefaultColumnsToReturn,
} from './dtos/select-deliveryman.dto';

@Injectable()
export class DeliverymansService {
  constructor(private readonly database: DatabaseService) {}

  async create(
    createDeliverymanDto: CreateDeliverymanDto,
    deliverymanColumnsToReturn?: DeliverymanColumnsToReturn,
  ): Promise<Deliveryman> {
    const select = {
      ...deliverymanDefaultColumnsToReturn,
      ...deliverymanColumnsToReturn,
    };

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

  findById(
    id: string,
    deliverymanColumnsToReturn?: DeliverymanColumnsToReturn,
  ): Promise<Deliveryman> {
    const select = {
      ...deliverymanDefaultColumnsToReturn,
      ...deliverymanColumnsToReturn,
    };

    return this.database.deliveryman.findUnique({ where: { id }, select });
  }

  findByUsername(
    username: string,
    deliverymanColumnsToReturn?: DeliverymanColumnsToReturn,
  ): Promise<Deliveryman> {
    const select = {
      ...deliverymanDefaultColumnsToReturn,
      ...deliverymanColumnsToReturn,
    };

    return this.database.deliveryman.findUnique({
      where: { username },
      select,
    });
  }

  async update(
    id: string,
    updateDeliverymanDto: UpdateDeliverymanDto,
    deliverymanColumnsToReturn?: DeliverymanColumnsToReturn,
  ): Promise<Deliveryman> {
    const select = {
      ...deliverymanDefaultColumnsToReturn,
      ...deliverymanColumnsToReturn,
    };

    if (updateDeliverymanDto.password) {
      updateDeliverymanDto.password = await bcrypt.hash(
        updateDeliverymanDto.password,
        10,
      );
    }

    return this.database.deliveryman.update({
      where: { id },
      data: updateDeliverymanDto,
      select,
    });
  }

  remove(id: string, deliverymanColumnsToReturn?: DeliverymanColumnsToReturn) {
    const select = {
      ...deliverymanDefaultColumnsToReturn,
      ...deliverymanColumnsToReturn,
    };

    return this.database.deliveryman.delete({ where: { id }, select });
  }
}
