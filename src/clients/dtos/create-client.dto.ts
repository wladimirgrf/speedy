import { IsString, MinLength } from 'class-validator';
import { Client } from '../entities/client.entity';

export class CreateClientDto extends Client {
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}
