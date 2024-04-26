import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ROLE } from '@prisma/client';
import { Roles } from 'src/decorator/roles.decorator';
import { AssetService } from './asset.service';
import { RolesGuard } from 'src/guard/roles.guard';
import { additionalFields } from './dto/subAsset.dto';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Get('/assetTypeId')
  async getAssetTypeId() {
    return this.assetService.getAssetTypeId();
  }

  @Get('/subAssetTypeId')
  async getSubAssetTypeId() {
    return this.assetService.getSubAssetTypeId();
  }
  @Roles(ROLE.MANAGER)
  @UseGuards(RolesGuard)
  @Post('/assetType')
  async createAssetType(@Body() payload: { id: number; name: string }) {
    return this.assetService.createAssetType(payload);
  }
  @Roles(ROLE.MANAGER)
  @UseGuards(RolesGuard)
  @Post('/subAssetType')
  async createSubAssetType(
    @Body()
    payload: {
      id: number;
      name: string;
      assetType: number;
      additionalFields: additionalFields[];
    },
  ) {
    return this.assetService.createSubAssetType(payload);
  }

  @Get('/assetType')
  async getAssetType() {
    return this.assetService.getAssetType();
  }
  @Get('/all/assetType')
  async getAllAssetType() {
    return this.assetService.getAllAssetType();
  }

  @Get('/all/subAssetType')
  async getAllSubAssetType() {
    return this.assetService.getAllSubAssetType();
  }

  @Get('/subAssetTypeForCollateral')
  async getSubAssetTypeForCollateral(@Query('id') id: number) {
    return this.assetService.getSubAssetTypeForCollateral(id);
  }
}
