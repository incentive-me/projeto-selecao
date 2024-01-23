import { Pagamentos, Prisma } from "@prisma/client";

export interface PaymentsRepository {
  create(data: Prisma.PagamentosUncheckedCreateInput): Promise<Pagamentos>;
  getPayments(): Promise<Pagamentos[]>;
  deletePayments(paymentID: string): Promise<Pagamentos>;
  updatePayments(paymentID: string, newName: string): Promise<Pagamentos>;
  filterPaymentsId(paymentID: string): Promise<Pagamentos | null>;
}
