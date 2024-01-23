import { Pagamentos } from "@prisma/client";
import { PaymentsRepository } from "../../repositories/payments-repository";
import { BalancesRepository } from "../../repositories/balance-repository";
import { WithoutBalanceError } from "../errors/without-balance";
import { BalanceNotFoundError } from "../errors/balance-not-found";

interface CreatePaymentUseCaseRequest {
  nome: string;
  descricao: string;
  valor: number;
  saldos_Id: string;
}

interface CreatePaymentUseCaseResponse {
  payment: Pagamentos;
}

export class CreatePaymentUseCase {
  constructor(
    private PaymentsRepository: PaymentsRepository,
    private BalancesRepository: BalancesRepository
  ) {}

  async execute({
    nome,
    descricao,
    valor,
    saldos_Id,
  }: CreatePaymentUseCaseRequest): Promise<CreatePaymentUseCaseResponse> {
    const balanceValue = await this.BalancesRepository.filterBalanceId(
      saldos_Id
    );

    if (!balanceValue) {
      throw new BalanceNotFoundError();
    }

    if (balanceValue.valorRestante < valor) {
      throw new WithoutBalanceError();
    }

    const payment = await this.PaymentsRepository.create({
      nome,
      descricao,
      valor,
      saldos_Id,
    });

    const valueLessValueRemaining = balanceValue.valorRestante - valor;
    await this.BalancesRepository.updateBalanceValue(
      balanceValue.id,
      valueLessValueRemaining
    );

    return {
      payment,
    };
  }
}
