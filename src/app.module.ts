import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ClientsModule } from './modules/clients/clients.module';
import { DeliverymansModule } from './modules/deliverymans/deliverymans.module';
import { DeliveriesModule } from './modules/deliveries/deliveries.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule,
    DeliverymansModule,
    DeliveriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
