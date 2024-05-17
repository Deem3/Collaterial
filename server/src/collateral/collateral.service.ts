import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { generateId } from 'src/utils/generateId';
import CreateCollateralDto from './dto/createCollateral.dto';
import { CreateReleaseCollateralDto } from './dto/createReleaseCollateral.dto';
import { CreateSoldDto } from './dto/createSold.dto';

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
    let id;
    let collateralExists = true;

    while (collateralExists) {
      id = generateId();
      const collateral = await this.prisma.collateral.findUnique({
        where: { id },
      });
      if (!collateral) {
        collateralExists = false;
      }
    }

    return id;
  }

  async getCollaterals() {
    const collaterals = await this.prisma.collateral.findMany();
    return collaterals.map((collateral) => ({
      ...collateral,
      id: collateral.id.toString(),
      ownerId: collateral.ownerId.toString(),
    }));
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

  async addSoldCollateral(payload: CreateSoldDto) {
    await this.prisma.sales.create({
      data: {
        amountSold: payload.amountSold,
        soldDate: payload.soldDate,
        collateralId: payload.collateralId,
      },
    });
    await this.prisma.collateral.update({
      where: {
        id: payload.collateralId,
      },
      data: {
        state: 'SOLD',
        description: payload.description,
      },
    });
  }

  async getSoldCollateralById(id: number) {
    const soldCollateral = await this.prisma.sales.findMany({
      where: {
        collateralId: BigInt(id),
      },
    });
    return soldCollateral.map((sold) => ({
      ...sold,
      collateralId: sold.collateralId.toString(),
      amountSold: sold.amountSold.toString(),
    }));
  }

  async createReleaseCollater(payload: CreateReleaseCollateralDto) {
    await this.prisma.collateral.update({
      where: {
        id: payload.collateralId,
      },
      data: {
        state: payload.state,
        description: payload.description,
      },
    });
  }

  async deleteCollateral(id: number) {
    return this.prisma.collateral.delete({
      where: {
        id: BigInt(id),
      },
    });
  }

  async getCollateralByOwnerId(ownerId: number) {
    const collaterals = await this.prisma.collateral.findMany({
      where: {
        ownerId: BigInt(ownerId),
      },
      include: {
        lend: true,
      },
    });
    if (!collaterals) {
      throw new NotFoundException('Collateral not found');
    }
    return collaterals
      .filter((collateral) => !collateral.lend)
      .map((collateral) => ({
        ...collateral,
        id: collateral.id.toString(),
        ownerId: collateral.ownerId.toString(),
      }));
  }
}
