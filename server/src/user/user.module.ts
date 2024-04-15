import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { UserService } from './user.service';

@Module({
  providers: [PrismaService, UserService, JwtService],
})
export class UserModule {}
