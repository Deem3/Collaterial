import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import CreateCollateralDto from './dto/createCollateral.dto';

@Injectable()
export class CollateralService {
  constructor(private readonly prisma: PrismaService) {}

  async createCollateral(payload: CreateCollateralDto) {
    return this.prisma.collateral.create({
      data: {
        ownerId: payload.owner,
        assetTypeId: payload.assetType,
        subAssetTypeId: payload.subAssetType,
        collateralName: payload.collateralName,
        state: payload.state,
        quantity: payload.quantity,
        depositAmount: payload.depositAmount,
        marketValue: payload.marketValue,
        dateOfAssessment: payload.dateOfAssessment,
        description: payload.description,
        additionalFields: payload.additionalFields,
        id: payload.id,
      },
    });
  }

  async getCollateralId() {
    const id = await this.prisma.collateral.findFirst({
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
      },
    });
    return id ? id.id : 0;
  }

  async getCollaterals() {
    return this.prisma.collateral.findMany();
  }

  async getCollateralById(id: number) {
    return this.prisma.collateral.findUnique({
      where: {
        id,
      },
    });
  }

  async updateCollateral(payload: CreateCollateralDto) {
    return this.prisma.collateral.update({
      where: {
        id: payload.id,
      },
      data: {
        ownerId: payload.owner,
        assetTypeId: payload.assetType,
        subAssetTypeId: payload.subAssetType,
        collateralName: payload.collateralName,
        state: payload.state,
        quantity: payload.quantity,
        depositAmount: payload.depositAmount,
        marketValue: payload.marketValue,
        dateOfAssessment: payload.dateOfAssessment,
        description: payload.description,
        additionalFields: payload.additionalFields,
      },
    });
  }
}
