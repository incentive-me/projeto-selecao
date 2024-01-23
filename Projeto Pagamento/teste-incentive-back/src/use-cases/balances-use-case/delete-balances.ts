import { Saldos } from "@prisma/client";
import { BalancesRepository } from "../../repositories/balance-repository";
import { PaymentsRepository } from "../../repositories/payments-repository";
import { BalanceWithPaymentError } from "../errors/balance-with-payment";

interface DeleteBalancesUseCaseRequest {
  balanceId: string;
}

interface DeleteBalancesUseCaseResponse {
  balances: Saldos;
}

export class DeleteBalancesUseCase {
  constructor(
    private balancesRepository: BalancesRepository,
    private paymentRepository: PaymentsRepository
  ) {}

  async execute({
    balanceId,
  }: DeleteBalancesUseCaseRequest): Promise<DeleteBalancesUseCaseResponse> {
    const searchPaymentWithSameBalanceId =
      await this.paymentRepository.getPayments();
    const searchBalanceIdinPayment = searchPaymentWithSameBalanceId.map(
      (payment) => payment.saldos_Id
    );

    if (searchBalanceIdinPayment.includes(balanceId)) {
      throw new BalanceWithPaymentError();
    }

    const BalancesDelete = await this.balancesRepository.deleteBalances(
      balanceId
    );

    return {
      balances: BalancesDelete,
    };
  }
}
