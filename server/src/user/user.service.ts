import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // async createUser(payload: CreateUserDto) {
  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       email: payload.email,
  //     },
  //   });
  //   if (user) {
  //     throw new ConflictException('User already exists');
  //   }
  //   const newUser = await this.prisma.user.create({
  //     data: {
  //       ...payload,
  //       password: await hash(payload.password, 10),
  //     },
  //   });
  //   const userWithoutPassword = exclude(newUser, ['password']);
  //   return userWithoutPassword;
  // }
  //
  async createUser(payload: RegisterDto) {
    return await this.prisma.user.create({
      data: {
        ...payload,
      },
    });
  }

  async findUserByUsername(username: string) {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
}
