import { Request, Response } from "express";
import { PrismaPaymentRepository } from "../../repositories/prisma/prisma-payment-repository";
import { CreatePaymentUseCase } from "../../use-cases/payments-use-case/create-payments";
import { z } from "zod";
import { PrismaBalanceRepository } from "../../repositories/prisma/prisma-balance-repository";
import { WithoutBalanceError } from "../../use-cases/errors/without-balance";

export async function CreatePayment(req: Request, res: Response) {
  const paymentBodySchema = z.object({
    nome: z.string(),
    descricao: z.string(),
    valor: z.number(),
    saldos_Id: z.string(),
  });

  const { nome, descricao, valor, saldos_Id } = paymentBodySchema.parse(
    req.body
  );

  try {
    const paymentRepository = new PrismaPaymentRepository();
    const balanceRepository = new PrismaBalanceRepository();
    const paymentUseCase = new CreatePaymentUseCase(
      paymentRepository,
      balanceRepository
    );

    await paymentUseCase.execute({
      nome,
      descricao,
      valor,
      saldos_Id,
    });

    res.status(201).json({ message: "Successfully created Payment" });
  } catch (error) {
    if (error instanceof WithoutBalanceError) {
      return res.status(409).send({
        message: error.message,
      });
    }

    res.status(500).json({ message: "Error while created Payments." });
  }
}
