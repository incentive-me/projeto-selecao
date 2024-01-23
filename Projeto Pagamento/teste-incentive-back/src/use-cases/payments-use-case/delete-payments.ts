import { Pagamentos } from "@prisma/client";
import { PaymentsRepository } from "../../repositories/payments-repository";
import { BalancesRepository } from "../../repositories/balance-repository";
import { BalanceNotFoundError } from "../errors/balance-not-found";
import { PaymentNotFoundError } from "../errors/payment-not-found";

interface DeletePaymentUseCaseRequest {
  paymentID: string;
}

interface DeletePaymentUseCaseResponse {
  payment: Pagamentos;
}

export class DeletePaymentUseCase {
  constructor(
    private PaymentsRepository: PaymentsRepository,
    private BalancesRepository: BalancesRepository
  ) {}

  async execute({
    paymentID,
  }: DeletePaymentUseCaseRequest): Promise<DeletePaymentUseCaseResponse> {
    const payment = await this.PaymentsRepository.filterPaymentsId(paymentID);

    if (!payment) {
      throw new PaymentNotFoundError();
    }

    const balanceValue = await this.BalancesRepository.filterBalanceId(
      payment?.saldos_Id
    );

    if (!balanceValue) {
      throw new BalanceNotFoundError();
    }

    const paymentDelete = await this.PaymentsRepository.deletePayments(
      paymentID
    );

    const returnValue = balanceValue?.valorRestante + payment.valor;
    await this.BalancesRepository.updateBalanceValue(
      balanceValue.id,
      returnValue
    );

    return {
      payment: paymentDelete,
    };
  }
}
