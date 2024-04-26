export type CreateLend = {
  accountNumber: number;
  debtorId: string;
  interestRate: number;
  loanAmount: number;
  termOfLoan: number;
  startDate: Date;
  endDate: Date;
};
