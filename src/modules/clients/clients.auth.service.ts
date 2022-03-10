import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import {
  CreateClientPayloadDto,
  CreateClientTokenDto,
} from './dtos/auth-client.dto';
import { UnauthorizedError } from 'src/errors';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly clientsService: ClientsService,
  ) {}

  async login(
    username: string,
    password: string,
  ): Promise<CreateClientTokenDto> {
    const client: Client = await this.clientsService.findByUsername(username);

    if (!client) {
      throw new UnauthorizedError(
        'We could not find an account with that username or password!',
      );
    }

    const passwordMatch = await bcrypt.compare(password, client.password);

    if (!passwordMatch) {
      throw new UnauthorizedError(
        'We could not find an account with that username or password!',
      );
    }

    const payload: CreateClientPayloadDto = {
      username: client.username,
      sub: client.id,
    };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
