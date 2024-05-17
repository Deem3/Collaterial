import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { generateId } from 'src/utils/generateId';
import { PrismaService } from './../../prisma/prisma.service';
import { CreateLend } from './dto/createLend.dto';
import { UpdateLend } from './dto/updateLend.dto';
import { UpdateRepayment } from './dto/updateRepayment.dto';

@Injectable()
export class LendService {
  constructor(private readonly prisma: PrismaService) {}

  async getLendAccountNumber() {
    let accountNumber;
    let lendExists = true;

    while (lendExists) {
      accountNumber = generateId();
      const lend = await this.prisma.lend.findUnique({
        where: { accountNumber },
      });
      if (!lend) {
        lendExists = false;
      }
    }

    return accountNumber;
  }

  async getLendById(id: number) {
    const lend = await this.prisma.lend.findUnique({
      where: { accountNumber: id },
    });

    if (!lend) {
      throw new Error(`Lend with id ${id} not found`);
    }

    return {
      ...lend,
      loanAmount: lend.loanAmount.toString(),
      debtorId: lend.debtorId.toString(),
    };
  }

  async updateLend(payload: UpdateLend) {
    const updatedLend = await this.prisma.lend.update({
      where: {
        accountNumber: payload.accountNumber,
      },
      data: {
        interestRate: payload.interestRate,
        loanAmount: payload.loanAmount,
        endDate: payload.endDate,
        startDate: payload.startDate,
        termOfLoan: payload.termOfLoan,
        debtorId: BigInt(payload.debtorId),
      },
    });

    const part = Math.floor(payload.loanAmount / payload.termOfLoan);
    const lastPart = payload.loanAmount - (payload.termOfLoan - 1) * part;

    await this.prisma.payment.updateMany({
      where: {
        accountNumber: payload.accountNumber,
      },
      data: {
        repaymentInfo: {
          set: Array.from({ length: payload.termOfLoan }, (_, i) => {
            return {
              loanBalance: i === payload.termOfLoan - 1 ? lastPart : part,
            };
          }),
        },
      },
    });

    return updatedLend;
  }

  async createLend(payload: CreateLend) {
    const existingLend = await this.prisma.lend.findUnique({
      where: { accountNumber: payload.accountNumber },
    });

    if (existingLend) {
      throw new ConflictException(
        `A lend record with the account number ${payload.accountNumber} already exists.`,
      );
    }

    const data = await this.prisma.lend.create({
      data: {
        interestRate: payload.interestRate,
        loanAmount: payload.loanAmount,
        endDate: payload.endDate,
        startDate: payload.startDate,
        termOfLoan: payload.termOfLoan,
        accountNumber: payload.accountNumber,
        debtorId: BigInt(payload.debtorId),
      },
    });

    const part = Math.floor(payload.loanAmount / payload.termOfLoan);
    const lastPart = payload.loanAmount - (payload.termOfLoan - 1) * part;

    const repaymentInfo = Array.from({ length: payload.termOfLoan }, (_, i) => {
      const paymentDate = new Date(payload.startDate);
      paymentDate.setMonth(paymentDate.getMonth() + i + 1);

      return {
        principalRepayment: 0,
        paymentInterest: 0,
        loanBalance: i === payload.termOfLoan - 1 ? lastPart : part,
        paymentPeriod: paymentDate,
      };
    });

    await this.prisma.payment.create({
      data: {
        accountNumber: data.accountNumber,
        repaymentInfo,
      },
    });
  }

  async getLends() {
    const lends = await this.prisma.lend.findMany();
    return lends.map((lend) => ({
      ...lend,
      debtorId: lend.debtorId.toString(),
      loanAmount: lend.loanAmount.toString(),
    }));
  }

  async getRepaymentById(id: number) {
    const data = await this.prisma.payment.findFirstOrThrow({
      where: {
        accountNumber: id,
      },
    });
    return data;
  }

  async updateRepayment(payload: UpdateRepayment) {
    const updatedRepaymentInfo = payload.repaymentInfo.map((info) => ({
      ...info,
      loanBalance: info.loanBalance - info.principalRepayment,
    }));

    return await this.prisma.payment.update({
      where: {
        id: payload.id,
      },
      data: {
        repaymentInfo: {
          set: updatedRepaymentInfo,
        },
      },
    });
  }

  async addCollateral(payload: { id: number; collateralId: number }) {
    const lend = await this.prisma.lend.findUnique({
      where: { accountNumber: payload.id },
    });

    if (!lend) {
      throw new Error(`Lend with id ${payload.id} not found`);
    }

    const collateral = await this.prisma.collateral.findUnique({
      where: { id: payload.collateralId },
    });

    if (!collateral) {
      throw new Error(`Collateral with id ${payload.collateralId} not found`);
    }

    await this.prisma.lend.update({
      where: { accountNumber: payload.id },
      data: {
        collateral: {
          connect: {
            id: payload.collateralId,
          },
        },
      },
    });
  }

  async getCollateralById(id: number) {
    const lend = await this.prisma.lend.findUnique({
      where: { accountNumber: id },
      include: {
        collateral: true,
      },
    });

    if (!lend) {
      throw new Error(`Lend with id ${id} not found`);
    }

    const collateral = lend.collateral;

    return collateral.map((c) => ({
      ...c,
      id: c.id.toString(),
      ownerId: c.ownerId.toString(),
    }));
  }

  async deleteLend(id: number) {
    const lend = await this.prisma.lend.findUnique({
      where: { accountNumber: id },
      include: {
        collateral: true,
      },
    });

    if (!lend) {
      throw new NotFoundException(`Lend with id ${id} not found`);
    }

    // Disconnect the relationship between the Lend and all related Collateral records
    for (const collateral of lend.collateral) {
      await this.prisma.collateral.update({
        where: { id: collateral.id },
        data: { lendId: null },
      });
    }

    await this.prisma.lend.delete({
      where: { accountNumber: id },
    });
  }

  async deleteCollateral(collateralId: number, lendId: number) {
    const collateralOnLend = await this.prisma.lend.findUnique({
      where: {
        accountNumber: lendId,
        collateral: {
          some: {
            id: collateralId,
          },
        },
      },
    });

    if (!collateralOnLend) {
      throw new NotFoundException(`Collateral with ${collateralId} not found on lend of ${lendId}`);
    }

    await this.prisma.lend.update({
      where: { accountNumber: lendId },
      data: {
        collateral: {
          disconnect: {
            id: collateralId,
          },
        },
      },
    });
  }
}
