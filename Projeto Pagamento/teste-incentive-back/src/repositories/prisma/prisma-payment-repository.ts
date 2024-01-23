import { Pagamentos, Prisma } from "@prisma/client";
import { PaymentsRepository } from "../payments-repository";
import { prisma } from "../../lib/prisma";

export class PrismaPaymentRepository implements PaymentsRepository {
  async filterPaymentsId(paymentID: string) {
    const payment = await prisma.pagamentos.findUnique({
      where: {
        id: paymentID,
      },
    });

    return payment;
  }

  async create(data: Prisma.PagamentosUncheckedCreateInput) {
    const payment = await prisma.pagamentos.create({
      data,
    });

    return payment;
  }

  async getPayments() {
    const payment = await prisma.pagamentos.findMany();

    return payment;
  }

  async deletePayments(paymentID: string) {
    const payment = await prisma.pagamentos.delete({
      where: {
        id: paymentID,
      },
    });

    return payment;
  }

  async updatePayments(
    paymentID: string,
    newName: string
  ): Promise<Pagamentos> {
    const paymentUpdate = await prisma.pagamentos.update({
      where: {
        id: paymentID,
      },
      data: {
        nome: newName,
      },
    });

    return paymentUpdate;
  }
}
