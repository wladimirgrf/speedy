import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UnauthorizedError } from '../../errors';
import { DeliverymansService } from './deliverymans.service';
import {
  CreateDeliverymanTokenDto,
  CreateDeliverymanPayloadDto,
} from './dtos/auth-deliveryman.dto';
import { Deliveryman } from './entities/deliverymana.entity';

@Injectable()
export class DeliverymansAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly deliverymansService: DeliverymansService,
  ) {}

  async login(
    username: string,
    password: string,
  ): Promise<CreateDeliverymanTokenDto> {
    const deliveryman: Deliveryman =
      await this.deliverymansService.findByUsername(username);

    if (!deliveryman) {
      throw new UnauthorizedError(
        'We could not find an account with that username or password!',
      );
    }

    const passwordMatch = await bcrypt.compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new UnauthorizedError(
        'We could not find an account with that username or password!',
      );
    }

    const payload: CreateDeliverymanPayloadDto = {
      username: deliveryman.username,
      sub: deliveryman.id,
    };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
