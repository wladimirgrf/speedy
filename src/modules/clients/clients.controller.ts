import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dtos/create-client.dto';
import { UpdateClientDto } from './dtos/update-client.dto';
import { CreateAuthDto, CreateClientTokenDto } from './dtos/auth-client.dto';
import { Client } from './entities/client.entity';
import { AuthGuard } from '@nestjs/passport';
import { ClientsAuthService } from './clients.auth.service';

@Controller('clients')
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly clientsAuthService: ClientsAuthService,
  ) {}

  @Post('authenticate')
  @HttpCode(HttpStatus.OK)
  login(
    @Body() { username, password }: CreateAuthDto,
  ): Promise<CreateClientTokenDto> {
    return this.clientsAuthService.login(username, password);
  }

  @Post()
  create(@Body() createUserDto: CreateClientDto): Promise<Client> {
    return this.clientsService.create(createUserDto, { password: false });
  }

  @UseGuards(AuthGuard('client'))
  @Get(':id')
  findById(@Param('id') id: string): Promise<Client> {
    return this.clientsService.findById(id, { password: false });
  }

  @UseGuards(AuthGuard('client'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateClientDto,
  ): Promise<Client> {
    return this.clientsService.update(id, updateUserDto, { password: false });
  }

  @UseGuards(AuthGuard('client'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.clientsService.remove(id);
  }
}
