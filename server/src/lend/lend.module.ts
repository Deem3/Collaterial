import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { LendController } from './lend.controller';
import { LendService } from './lend.service';

@Module({
  providers: [LendService, PrismaService, JwtService],
  controllers: [LendController],
})
export class LendModule {}
