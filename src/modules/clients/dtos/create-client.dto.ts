import { IsString, MinLength, IsLowercase } from 'class-validator';
import { Client } from '../entities/client.entity';

export class CreateClientDto extends Client {
  @IsString()
  @IsLowercase()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}
