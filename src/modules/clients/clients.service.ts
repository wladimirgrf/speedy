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
import { ClientSelect, clientDefaultSelect } from './dtos/select-client.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly database: DatabaseService) {}

  async create(
    createUserDto: CreateClientDto,
    clientSelect?: ClientSelect,
  ): Promise<Client> {
    const select = { ...clientDefaultSelect, ...clientSelect };

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

  findAll(clientSelect?: ClientSelect): Promise<Client[]> {
    const select = { ...clientDefaultSelect, ...clientSelect };
    return this.database.client.findMany({ select });
  }

  findById(id: string, clientSelect?: ClientSelect): Promise<Client> {
    const select = { ...clientDefaultSelect, ...clientSelect };
    return this.database.client.findUnique({ where: { id }, select });
  }

  findByUsername(
    username: string,
    clientSelect?: ClientSelect,
  ): Promise<Client> {
    const select = { ...clientDefaultSelect, ...clientSelect };
    return this.database.client.findUnique({
      where: { username },
      select,
    });
  }

  async update(
    id: string,
    updateUserDto: UpdateClientDto,
    clientSelect?: ClientSelect,
  ): Promise<Client> {
    const select = { ...clientDefaultSelect, ...clientSelect };

    const client: ClientUpdateInput = {
      ...updateUserDto,
      password: await bcrypt.hash(updateUserDto.password, 10),
    };

    return this.database.client.update({
      where: { id },
      data: client,
      select,
    });
  }

  remove(id: string, clientSelect?: ClientSelect) {
    const select = { ...clientDefaultSelect, ...clientSelect };
    return this.database.client.delete({ where: { id }, select });
  }
}
