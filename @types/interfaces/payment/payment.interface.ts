export interface IPaymentHistory {
    balance: number;
    transactions: {
      txid: string;
      date: string;
      amount: number;
      status: string;
    }[];
  }
  