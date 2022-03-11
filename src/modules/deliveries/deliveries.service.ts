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
}
