export type PaymentResponse = {
  id: string;
  name: string;
  description: string;
  value: number;
  balance: {
    id: string;
    name: string;
  };
};
