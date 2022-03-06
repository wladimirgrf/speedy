import { Module } from '@nestjs/common';

import { ClientsModule } from './clients/clients.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), ClientsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
