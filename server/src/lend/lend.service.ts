import { Injectable } from '@nestjs/common';
import { generateId } from 'src/utils/generateId';
import { PrismaService } from './../../prisma/prisma.service';
import { CreateLend } from './dto/createLend.dto';

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

  async createLend(payload: CreateLend) {
    return this.prisma.lend.create({
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
  }

  async getLends() {
    const lends = await this.prisma.lend.findMany();
    return lends.map((lend) => ({
      ...lend,
      debtorId: lend.debtorId.toString(),
      loanAmount: lend.loanAmount.toString(),
    }));
  }
}
