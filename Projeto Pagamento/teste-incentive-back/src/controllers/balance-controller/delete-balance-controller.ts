import { Request, Response } from "express";
import { PrismaBalanceRepository } from "../../repositories/prisma/prisma-balance-repository";
import { DeleteBalancesUseCase } from "../../use-cases/balances-use-case/delete-balances";
import { PrismaPaymentRepository } from "../../repositories/prisma/prisma-payment-repository";
import { BalanceWithPaymentError } from "../../use-cases/errors/balance-with-payment";

export async function DeleteBalances(req: Request, res: Response) {
  const balanceId = req.params.balanceId;

  try {
    const balanceRepository = new PrismaBalanceRepository();
    const paymentRepository = new PrismaPaymentRepository();
    const balanceUseCase = new DeleteBalancesUseCase(
      balanceRepository,
      paymentRepository
    );

    await balanceUseCase.execute({
      balanceId,
    });

    res.status(200).json({ message: "Successfully Deleted Payment" });
  } catch (error) {
    if (error instanceof BalanceWithPaymentError) {
      return res.status(409).send({
        message: error.message,
      });
    }

    res.status(500).json({ message: "Internal server error" });
  }
}
