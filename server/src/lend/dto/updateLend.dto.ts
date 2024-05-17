export type UpdateLend = {
  accountNumber: number;
  debtorId: number;
  interestRate: number;
  loanAmount: number;
  termOfLoan: number;
  startDate: Date;
  endDate: Date;
};
