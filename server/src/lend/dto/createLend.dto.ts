export type CreateLend = {
  accountNumber: number;
  debtorId: number;
  interestRate: number;
  loanAmount: number;
  termOfLoan: number;
  startDate: Date;
  endDate: Date;
};
