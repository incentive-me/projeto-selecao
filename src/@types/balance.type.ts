export interface BalanceProps {
  documentId?: string;
  name: string;
  description: string;
  initialValue: number;
  usedValue?: number;
  remainingValue: number;
  userId: string;
}
