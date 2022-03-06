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

@Injectable()
export class ClientsService {
  constructor(private readonly database: DatabaseService) {}

  async create(createUserDto: CreateClientDto): Promise<Client> {
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

    return this.database.client.create({ data: client });
  }

  findAll(): Promise<Client[]> {
    return this.database.client.findMany();
  }

  findById(id: string): Promise<Client> {
    return this.database.client.findUnique({ where: { id } });
  }

  findByUsername(username: string): Promise<Client> {
    return this.database.client.findUnique({
      where: { username },
    });
  }

  update(id: string, updateUserDto: UpdateClientDto): Promise<Client> {
    const client: ClientUpdateInput = updateUserDto;

    return this.database.client.update({
      where: { id },
      data: client,
    });
  }

  remove(id: string) {
    return this.database.client.delete({ where: { id } });
  }
}
