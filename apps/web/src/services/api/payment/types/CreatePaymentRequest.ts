export type CreatePaymentRequest = {
  name: string;
  description: string;
  value: number;
  balance: {
    id: string;
    name: string;
  };
};
