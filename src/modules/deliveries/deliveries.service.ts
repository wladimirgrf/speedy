import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { NotFoundError } from 'src/errors';
import { ClientsService } from '../clients/clients.service';
import { CreateDeliveryDto } from './dtos/create-delivery.dto';
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

    if (!deliveries) {
      throw new NotFoundError('Deliveries were not found.');
    }

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
}
