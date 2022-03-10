import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConflictError } from 'src/errors/ConflictError';

import { DatabaseService } from 'src/database/database.service';
import { CreateClientDto } from './dtos/create-client.dto';
import { UpdateClientDto } from './dtos/update-client.dto';
import {
  Client,
  ClientCreateInput,
  ClientUpdateInput,
} from './entities/client.entity';
import {
  ClientColumnsToReturn,
  clientDefaultColumnsToReturn,
} from './dtos/select-client.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly database: DatabaseService) {}

  async create(
    createUserDto: CreateClientDto,
    clientColumnsToReturn?: ClientColumnsToReturn,
  ): Promise<Client> {
    const select = {
      ...clientDefaultColumnsToReturn,
      ...clientColumnsToReturn,
    };

    const clientAlreadyExists = await this.database.client.findUnique({
      where: { username: createUserDto.username },
    });

    if (clientAlreadyExists) {
      throw new ConflictError('This username is already being used.');
    }

    const client: ClientCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    return this.database.client.create({ data: client, select });
  }

  findById(
    id: string,
    clientColumnsToReturn?: ClientColumnsToReturn,
  ): Promise<Client> {
    const select = {
      ...clientDefaultColumnsToReturn,
      ...clientColumnsToReturn,
    };

    return this.database.client.findUnique({ where: { id }, select });
  }

  findByUsername(
    username: string,
    clientColumnsToReturn?: ClientColumnsToReturn,
  ): Promise<Client> {
    const select = {
      ...clientDefaultColumnsToReturn,
      ...clientColumnsToReturn,
    };

    return this.database.client.findUnique({
      where: { username },
      select,
    });
  }

  async update(
    id: string,
    updateClientDto: UpdateClientDto,
    clientColumnsToReturn?: ClientColumnsToReturn,
  ): Promise<Client> {
    const select = {
      ...clientDefaultColumnsToReturn,
      ...clientColumnsToReturn,
    };

    if (updateClientDto.password) {
      updateClientDto.password = await bcrypt.hash(
        updateClientDto.password,
        10,
      );
    }

    return this.database.client.update({
      where: { id },
      data: updateClientDto,
      select,
    });
  }

  remove(id: string, clientColumnsToReturn?: ClientColumnsToReturn) {
    const select = {
      ...clientDefaultColumnsToReturn,
      ...clientColumnsToReturn,
    };

    return this.database.client.delete({ where: { id }, select });
  }
}
