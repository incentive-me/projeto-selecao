import { Saldos } from "@prisma/client";
import { BalancesRepository } from "../../repositories/balance-repository";

interface CreateBalancesUseCaseRequest {
  nome: string;
  descricao: string;
  valorInicial: number;
  valorRestante: number;
}

interface CreateBalancesUseCaseResponse {
  balance: Saldos;
}

export class CreateBalanceUseCase {
  constructor(private balancesRepository: BalancesRepository) {}

  async execute({
    nome,
    descricao,
    valorInicial,
    valorRestante,
  }: CreateBalancesUseCaseRequest): Promise<CreateBalancesUseCaseResponse> {
    const balance = await this.balancesRepository.create({
      nome,
      descricao,
      valorInicial,
      valorRestante: valorInicial,
    });

    return {
      balance,
    };
  }
}
