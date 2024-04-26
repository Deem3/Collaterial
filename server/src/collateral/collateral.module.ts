import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { CollateralController } from './collateral.controller';
import { CollateralService } from './collateral.service';

@Module({
  providers: [CollateralService, PrismaService, JwtService],
  controllers: [CollateralController],
})
export class CollateralModule {}
