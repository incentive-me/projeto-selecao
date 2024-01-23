import { Request, Response } from "express";
import { z } from "zod";
import { PrismaBalanceRepository } from "../../repositories/prisma/prisma-balance-repository";
import { UpdateBalanceUseCase } from "../../use-cases/balances-use-case/update-balances";

export async function UpdateBalance(req: Request, res: Response) {
  const balanceBodySchema = z.object({
    nome: z.string(),
  });

  const { nome } = balanceBodySchema.parse(req.body);
  const balanceId = req.params.balanceId;

  try {
    const balanceRepository = new PrismaBalanceRepository();
    const balanceUseCase = new UpdateBalanceUseCase(balanceRepository);

    await balanceUseCase.execute({
      balanceId,
      newName: nome,
    });

    res.status(201).json({ message: "Successfully Uploaded Balance" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal server error" });
  }
}
