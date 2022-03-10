import { Module } from '@nestjs/common';
import { DeliverymansService } from './deliverymans.service';
import { DeliverymansController } from './deliverymans.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
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
