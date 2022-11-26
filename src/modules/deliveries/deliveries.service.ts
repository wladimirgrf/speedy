import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { NotFoundError, UnauthorizedError } from '../../errors';
import { ClientsService } from '../clients/clients.service';
import { CreateDeliveryDto } from './dtos/create-delivery.dto';
import { UpdateDeliveryDto } from './dtos/update-delivery.dto';
import { Delivery } from './entities/delivery.entity';

@Injectable()
export class DeliveriesService {
  constructor(
    private readonly database: DatabaseService,
    private readonly clientService: ClientsService,
  ) {}

  async create(createDeliveryDto: CreateDeliveryDto): Promise<Delivery> {
    const clientExists = await this.clientService.findById(
      createDeliveryDto.id_client,
    );

    if (!clientExists) {
      throw new NotFoundError('Client was not found.');
    }

    return this.database.delivery.create({
      data: { ...createDeliveryDto, status: 'IN_PREPARATION' },
    });
  }

  async findAll(userId: string): Promise<Delivery[]> {
    const id_client = { equals: userId };
    const id_deliveryman = { equals: userId };

    const deliveries = await this.database.delivery.findMany({
      where: {
        OR: [{ id_client }, { id_deliveryman }],
      },
    });

    return deliveries;
  }

  async findById(id: string, userId: string): Promise<Delivery> {
    const id_client = { equals: userId };
    const id_deliveryman = { equals: userId };

    const delivery = await this.database.delivery.findFirst({
      where: {
        AND: [{ id: { equals: id } }],
        OR: [{ id_client }, { id_deliveryman }],
      },
    });

    if (!delivery) {
      throw new NotFoundError('Delivery was not found.');
    }

    return delivery;
  }

  findOpenDeliveries(): Promise<Delivery[]> {
    return this.database.delivery.findMany({ where: { id_deliveryman: null } });
  }

  async update(
    id: string,
    userId: string,
    updateDeliveryDto: UpdateDeliveryDto,
  ): Promise<Delivery> {
    const delivery = await this.database.delivery.findUnique({
      where: { id },
    });

    if (!delivery) {
      throw new NotFoundError('Delivery was not found.');
    }

    if (
      delivery.id_deliveryman !== null &&
      delivery.id_deliveryman !== userId
    ) {
      throw new UnauthorizedError(
        'You are not authorized to perform this action!',
      );
    }

    const data: Delivery = { ...delivery, ...updateDeliveryDto };

    if (delivery.id_deliveryman === null) {
      data.id_deliveryman = userId;
    }

    return this.database.delivery.update({
      data,
      where: { id },
    });
  }
}
