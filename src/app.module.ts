import { Module } from '@nestjs/common';

import { ClientsModule } from './modules/clients/clients.module';
import { DeliverymansModule } from './modules/deliverymans/deliverymans.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), ClientsModule, DeliverymansModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
