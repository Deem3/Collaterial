export type UpdateRepayment = {
  accountNumber: number;
  id: string;
  repaymentInfo: {
    loanBalance: number;
    paymentInterest: number;
    paymentPeriod: Date;
    principalRepayment: number;
  }[];
};
