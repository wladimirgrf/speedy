import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user: Prisma.UserCreateInput = createUserDto;

    return this.prisma.user.create({ data: user });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user: Prisma.UserUpdateInput = updateUserDto;

    return this.prisma.user.update({ where: { id }, data: user });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
