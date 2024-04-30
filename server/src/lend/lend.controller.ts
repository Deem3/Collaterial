import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ROLE } from '@prisma/client';
import { Roles } from 'src/decorator/roles.decorator';
import { RolesGuard } from 'src/guard/roles.guard';
import { CreateLend } from './dto/createLend.dto';
import { UpdateRepayment } from './dto/updateRepayment.dto';
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
  @Get('/byId')
  async getLendById(@Query('id') id: number) {
    return this.lendService.getLendById(id);
  }

  @Roles(ROLE.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Get('/')
  async getLends() {
    return this.lendService.getLends();
  }

  @Roles(ROLE.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Get('/repayment')
  async getRepayment(@Query('id') id: number) {
    return await this.lendService.getRepaymentById(id);
  }

  @Put('/repayment')
  async updateRepayment(@Body() payload: UpdateRepayment) {
    return await this.lendService.updateRepayment(payload);
  }

  @Post('/collateral')
  async addCollateral(@Body() payload: { id: number; collateralId: number }) {
    return await this.lendService.addCollateral(payload);
  }

  @Get('/collateral')
  async getCollateral(@Query('id') id: number) {
    return await this.lendService.getCollateralById(id);
  }
}
