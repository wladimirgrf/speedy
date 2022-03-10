import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
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
