import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { CreateDeliverymanPayloadDto } from './dtos/auth-deliveryman.dto';

@Injectable()
export class DeliverymansStrategy extends PassportStrategy(
  Strategy,
  'deliveryman',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_DELIVERYMAN_SECRET,
    });
  }

  validate(payload: CreateDeliverymanPayloadDto) {
    const { sub, username } = payload;
    return { id: sub, username };
  }
}
