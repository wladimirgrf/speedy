import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateAuthDto } from './dtos/create-auth.dto';
import { CreateUserTokenDto } from './dtos/create-user-token.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(
    @Body() { email, password }: CreateAuthDto,
  ): Promise<CreateUserTokenDto> {
    return this.authService.login(email, password);
  }
}
