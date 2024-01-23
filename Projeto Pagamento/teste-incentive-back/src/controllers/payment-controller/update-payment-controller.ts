import { Request, Response } from "express";
import { PrismaPaymentRepository } from "../../repositories/prisma/prisma-payment-repository";
import { UpdatePaymentUseCase } from "../../use-cases/payments-use-case/update-payments";
import { z } from "zod";

export async function UpdatePayment(req: Request, res: Response) {
  const paymentBodySchema = z.object({
    nome: z.string(),
  });

  const { nome } = paymentBodySchema.parse(req.body);
  const paymentID = req.params.paymentID;

  try {
    const paymentRepository = new PrismaPaymentRepository();
    const paymentUseCase = new UpdatePaymentUseCase(paymentRepository);

    await paymentUseCase.execute({
      paymentID,
      newName: nome,
    });

    res.status(201).json({ message: "Successfully Uploaded Payment" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal server error" });
  }
}
