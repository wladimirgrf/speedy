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

@Injectable()
export class DeliverymansService {
  constructor(private readonly database: DatabaseService) {}

  async create(
    createDeliverymanDto: CreateDeliverymanDto,
  ): Promise<Deliveryman> {
    const deliverymanAlreadyExists = await this.database.deliveryman.findUnique(
      {
        where: { username: createDeliverymanDto.username },
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

  findAll(): Promise<Deliveryman[]> {
    return this.database.deliveryman.findMany();
  }

  findById(id: string): Promise<Deliveryman> {
    return this.database.deliveryman.findUnique({ where: { id } });
  }

  findByUsername(username: string): Promise<Deliveryman> {
    return this.database.deliveryman.findUnique({
      where: { username },
    });
  }

  update(
    id: string,
    updateDeliverymanDto: UpdateDeliverymanDto,
  ): Promise<Deliveryman> {
    const deliveryman: DeliverymanUpdateInput = updateDeliverymanDto;

    return this.database.deliveryman.update({
      where: { id },
      data: deliveryman,
    });
  }

  remove(id: string) {
    return this.database.deliveryman.delete({ where: { id } });
  }
}
