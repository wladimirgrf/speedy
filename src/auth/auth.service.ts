import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserTokenDto } from './dtos/create-user-token.dto';
import { CreateUserPayloadDto } from './dtos/create-user-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(email: string, password: string): Promise<CreateUserTokenDto> {
    const user: User = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException(
        'We could not find an account with that email or password!',
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException(
        'We could not find an account with that email or password!',
      );
    }

    const payload: CreateUserPayloadDto = {
      username: user.email,
      sub: user.id,
    };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
