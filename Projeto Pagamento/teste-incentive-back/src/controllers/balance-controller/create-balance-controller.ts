import { Request, Response } from "express";
import { z } from "zod";
import { PrismaBalanceRepository } from "../../repositories/prisma/prisma-balance-repository";
import { CreateBalanceUseCase } from "../../use-cases/balances-use-case/create-balances";

export async function CreateBalance(req: Request, res: Response) {
  const balanceBodySchema = z.object({
    nome: z.string(),
    descricao: z.string(),
    valorInicial: z.number(),
  });

  const { nome, descricao, valorInicial } = balanceBodySchema.parse(req.body);

  try {
    const balanceRepository = new PrismaBalanceRepository();
    const balanceUseCase = new CreateBalanceUseCase(balanceRepository);

    await balanceUseCase.execute({
      nome,
      descricao,
      valorInicial,
      valorRestante: valorInicial,
    });

    res.status(201).json({ message: "Successfully created Balance" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error while created Balance." });
  }
}
