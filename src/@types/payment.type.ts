export interface PaymentProps {
  documentId?: string;
  name: string;
  description: string;
  price: number;
  userId: string;
  idBalance?: string;
}
