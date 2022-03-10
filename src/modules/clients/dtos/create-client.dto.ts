import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';
import { Client } from '../entities/client.entity';

export class CreateClientDto extends Client {
  @IsString()
  @Transform((username) => username.value.toLowerCase())
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}
