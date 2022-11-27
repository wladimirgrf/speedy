import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { DatabaseModule } from '../../database/database.module';
import { ClientsAuthService } from './clients.auth.service';
import { ClientsStrategy } from './clients.strategy';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_CLIENT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [ClientsController],
  providers: [ClientsService, ClientsAuthService, ClientsStrategy],
})
export class ClientsModule {}
