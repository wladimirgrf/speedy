import { IsLowercase, IsString, MinLength } from 'class-validator';

export interface CreateDeliverymanPayloadDto {
  username: string;
  sub: string;
}

export interface CreateDeliverymanTokenDto {
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
