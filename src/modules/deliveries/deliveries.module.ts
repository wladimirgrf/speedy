import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ClientsService } from '../clients/clients.service';
import { DeliveriesController } from './deliveries.controller';
import { DeliveriesService } from './deliveries.service';

@Module({
  imports: [DatabaseModule],
  controllers: [DeliveriesController],
  providers: [DeliveriesService, ClientsService],
})
export class DeliveriesModule {}
