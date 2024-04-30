export const formatDate = (date: Date) => {
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  return `${year}/${month}/${day}`;
};

export type LendType = {
  accountNumber: number;
  debtorId: string;
  endDate: Date;
  interestRate: number;
  loanAmount: number;
  startDate: Date;
  termOfLoan: number;
};

export type PaymentType = {
  accountNumber: number;
  id: string;
  repaymentInfo: {
    loanBalance: number;
    paymentInterest: number;
    paymentPeriod: Date;
    principalRepayment: number;
  }[];
};
