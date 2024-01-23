import { Request, Response } from "express";
import { PrismaPaymentRepository } from "../../repositories/prisma/prisma-payment-repository";
import { GetPaymentUseCase } from "../../use-cases/payments-use-case/get-payments";

export async function GetPayment(req: Request, res: Response) {
  try {
    const paymentRepository = new PrismaPaymentRepository();
    const paymentUseCase = new GetPaymentUseCase(paymentRepository);

    const result = await paymentUseCase.execute();

    res.status(200).json({ payments: result.payments });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error while retrieving Payments." });
  }
}
