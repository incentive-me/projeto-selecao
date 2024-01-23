import { Request, Response } from "express";
import { PrismaPaymentRepository } from "../../repositories/prisma/prisma-payment-repository";
import { DeletePaymentUseCase } from "../../use-cases/payments-use-case/delete-payments";
import { PrismaBalanceRepository } from "../../repositories/prisma/prisma-balance-repository";

export async function DeletePayment(req: Request, res: Response) {
  const paymentID = req.params.paymentID;

  try {
    const paymentRepository = new PrismaPaymentRepository();
    const balanceRepository = new PrismaBalanceRepository();
    const paymentUseCase = new DeletePaymentUseCase(
      paymentRepository,
      balanceRepository
    );

    await paymentUseCase.execute({
      paymentID,
    });

    res.status(200).json({ message: "Successfully Deleted Payment" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal server error" });
  }
}
