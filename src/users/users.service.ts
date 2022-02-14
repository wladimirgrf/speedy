import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import UserSelect from 'src/prisma/selects/user.select';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    return this.prisma.user.create({ data: user, select: UserSelect });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({ select: UserSelect });
  }

  findById(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id }, select: UserSelect });
  }

  findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
      select: UserSelect,
    });
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user: Prisma.UserUpdateInput = updateUserDto;

    return this.prisma.user.update({
      where: { id },
      data: user,
      select: UserSelect,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id }, select: UserSelect });
  }
}
