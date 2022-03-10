import { IsLowercase, IsString, MinLength } from 'class-validator';

export interface CreateClientPayloadDto {
  username: string;
  sub: string;
}

export interface CreateClientTokenDto {
  accessToken: string;
}

export class CreateAuthDto {
  @IsString()
  @IsLowercase()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}
