import { Injectable } from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';
import { CreateLend } from './dto/createLend.dto';

@Injectable()
export class LendService {
  constructor(private readonly prismaService: PrismaService) {}

  async getLendAccountNumber() {
    const accountNumber = await this.prismaService.lend.findFirst({
      orderBy: {
        accountNumber: 'desc',
      },
      select: {
        id: true,
      },
    });
    return accountNumber ? accountNumber.id : 0;
  }

  async createLend(payload: CreateLend) {
    const lend = await this.prismaService.lend.create({
      data: {
        interestRate: payload.interestRate,
        loanAmount: payload.loanAmount,
        endDate: payload.endDate,
        startDate: payload.startDate,
        termOfLoan: payload.termOfLoan,
        debtorId: payload.debtorId,
        accountNumber: payload.accountNumber,
      },
    });
    return lend;
  }

  async getLends() {
    return this.prismaService.lend.findMany();
  }
}
