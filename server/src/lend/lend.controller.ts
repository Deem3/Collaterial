import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ROLE } from '@prisma/client';
import { Roles } from 'src/decorator/roles.decorator';
import { RolesGuard } from 'src/guard/roles.guard';
import { CreateLend } from './dto/createLend.dto';
import { LendService } from './lend.service';

@Controller('lend')
export class LendController {
  constructor(private readonly lendService: LendService) {}

  @Roles(ROLE.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Get('/accountNumber')
  async getLendAccountNumber() {
    return this.lendService.getLendAccountNumber();
  }

  @Roles(ROLE.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Post('/')
  async createLend(@Body() payload: CreateLend) {
    return this.lendService.createLend(payload);
  }

  @Roles(ROLE.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Get('/')
  async getLends() {
    return this.lendService.getLends();
  }
}
