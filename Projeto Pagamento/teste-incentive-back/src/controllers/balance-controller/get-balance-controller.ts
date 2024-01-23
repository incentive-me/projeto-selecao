import { Request, Response } from "express";
import { PrismaBalanceRepository } from "../../repositories/prisma/prisma-balance-repository";
import { GetBalancesUseCase } from "../../use-cases/balances-use-case/get-balances";

export async function GetBalance(req: Request, res: Response) {
  try {
    const balanceRepository = new PrismaBalanceRepository();
    const balanceUseCase = new GetBalancesUseCase(balanceRepository);

    const result = await balanceUseCase.execute();

    res.status(200).json({ balance: result.balances });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error while retrieving Balances." });
  }
}
