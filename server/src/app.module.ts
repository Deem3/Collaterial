import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { CustomerService } from './customer/customer.service';
import { CustomerModule } from './customer/customer.module';
import { AssetModule } from './asset/asset.module';
import { CollateralModule } from './collateral/collateral.module';
import { LendModule } from './lend/lend.module';

@Module({
  providers: [AuthService, PrismaService, UserService, JwtService, CustomerService],
  imports: [AuthModule, UserModule, ConfigModule.forRoot(), CustomerModule, AssetModule, CollateralModule, LendModule],
  controllers: [UserController],
})
export class AppModule {}
