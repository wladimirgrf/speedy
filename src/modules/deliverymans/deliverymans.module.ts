import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DeliverymansService } from './deliverymans.service';
import { DeliverymansController } from './deliverymans.controller';
import { DatabaseModule } from '../../database/database.module';
import { DeliverymansAuthService } from './deliverymans.auth.service';
import { DeliverymansStrategy } from './deliverymans.strategy';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_DELIVERYMAN_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [DeliverymansController],
  providers: [
    DeliverymansService,
    DeliverymansAuthService,
    DeliverymansStrategy,
  ],
})
export class DeliverymansModule {}
