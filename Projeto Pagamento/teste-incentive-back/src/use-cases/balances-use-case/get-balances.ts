import { BalancesRepository } from "../../repositories/balance-repository";
import { Saldos } from "@prisma/client"; // Certifique-se de importar o tipo correto aqui

interface GetBalancesUseCaseResponse {
  balances: Saldos[];
}

export class GetBalancesUseCase {
  constructor(private balancesRepository: BalancesRepository) {}

  async execute(): Promise<GetBalancesUseCaseResponse> {
    const balances = await this.balancesRepository.getBalances();

    return {
      balances,
    };
  }
}
