import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { additionalFields } from './dto/subAsset.dto';

@Injectable()
export class AssetService {
  constructor(private readonly prisma: PrismaService) {}

  async createAssetType(payload: { id: number; name: string }) {
    const assetType = await this.prisma.assetType.create({
      data: {
        id: payload.id,
        name: payload.name,
      },
    });
    return assetType;
  }

  async deleteAsset(id: number) {
    const asset = await this.prisma.assetType.findUnique({
      where: {
        id: id,
      },
    });

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    await this.prisma.assetType.delete({
      where: {
        id: id,
      },
    });
  }

  async deleteSubAsset(id: number) {
    const subAsset = await this.prisma.subAssetType.findUnique({
      where: {
        id: id,
      },
    });

    if (!subAsset) {
      throw new NotFoundException('SubAsset not found');
    }

    await this.prisma.subAssetType.delete({
      where: {
        id: id,
      },
    });
  }

  async createSubAssetType(payload: {
    id: number;
    name: string;
    assetType: number;
    additionalFields: additionalFields[];
  }) {
    const subAssetType = await this.prisma.subAssetType.create({
      data: {
        id: payload.id,
        name: payload.name,
        assetTypeId: payload.assetType,
        additionalFields: payload.additionalFields,
      },
    });
    return subAssetType;
  }

  async getAssetTypeId() {
    const assetType = await this.prisma.assetType.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return assetType ? assetType.id : 0;
  }

  async getSubAssetTypeId() {
    const subAssetType = await this.prisma.subAssetType.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return subAssetType ? subAssetType.id : 0;
  }

  async getAssetType() {
    const assetType = await this.prisma.assetType.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return assetType;
  }

  async getAllAssetType() {
    return this.prisma.assetType.findMany();
  }

  async getAllSubAssetType() {
    return this.prisma.subAssetType.findMany({
      include: {
        assetType: true,
      },
    });
  }

  async getSubAssetTypeForCollateral(id: number) {
    const test = await this.prisma.subAssetType.findMany({
      where: {
        assetTypeId: id,
      },
    });
    return test;
  }
}
