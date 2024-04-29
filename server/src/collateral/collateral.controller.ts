import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ROLE } from '@prisma/client';
import { Roles } from 'src/decorator/roles.decorator';
import { RolesGuard } from 'src/guard/roles.guard';
import { CollateralService } from './collateral.service';
import CreateCollateralDto from './dto/createCollateral.dto';
import { CreateReleaseCollateralDto } from './dto/createReleaseCollateral.dto';
import { CreateSoldDto } from './dto/createSold.dto';

@Controller('collateral')
export class CollateralController {
  constructor(private collateralService: CollateralService) {}

  @Roles(ROLE.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Post('/')
  async createCollateral(@Body() payload: CreateCollateralDto) {
    return this.collateralService.createCollateral(payload);
  }

  @Roles(ROLE.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Get('/collateralId')
  async getCollateralId() {
    return this.collateralService.getCollateralId();
  }

  @Roles(ROLE.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Get('/')
  async getCollaterals() {
    return this.collateralService.getCollaterals();
  }

  @Roles(ROLE.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Get('/collateral')
  async getCollateralById(@Query('id') id: number) {
    return this.collateralService.getCollateralById(id);
  }

  @Roles(ROLE.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Put('/')
  async updateCollateral(@Body() payload: CreateCollateralDto) {
    return this.collateralService.updateCollateral(payload);
  }

  @Roles(ROLE.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Post('/sold')
  async addSoldCollateral(@Body() payload: CreateSoldDto) {
    return this.collateralService.addSoldCollateral(payload);
  }

  @Roles(ROLE.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Get('/sales')
  async getSoldCollateralById(@Query('id') id: number) {
    return this.collateralService.getSoldCollateralById(id);
  }

  @Roles(ROLE.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Post('/release')
  async createReleaseCollateral(@Body() payload: CreateReleaseCollateralDto) {
    return this.collateralService.createReleaseCollater(payload);
  }

  @Roles(ROLE.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Delete('/')
  async deleteCollateral(@Query('id') id: number) {
    return this.collateralService.deleteCollateral(id);
  }
}
