import { BalancesRepository } from "../../repositories/balance-repository";

interface UpdateBalanceUseCaseRequest {
  balanceId: string;
  newName: string;
}

export class UpdateBalanceUseCase {
  constructor(private balancesRepository: BalancesRepository) {}

  async execute({ balanceId, newName }: UpdateBalanceUseCaseRequest) {
    try {
      const Balance = await this.balancesRepository.updateBalances(
        balanceId,
        newName
      );

      return {
        Balance,
      };
    } catch (error) {
      return console.log(error);
    }
  }
}
