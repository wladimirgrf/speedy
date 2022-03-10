import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { CreateClientPayloadDto } from './dtos/auth-client.dto';

@Injectable()
export class ClientsStrategy extends PassportStrategy(Strategy, 'client') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_CLIENT_SECRET,
    });
  }

  validate(payload: CreateClientPayloadDto) {
    const { sub, username } = payload;
    return { id: sub, username };
  }
}
