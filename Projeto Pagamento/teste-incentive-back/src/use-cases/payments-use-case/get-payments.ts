import { PaymentsRepository } from "../../repositories/payments-repository";
import { Pagamentos } from "@prisma/client"; // Certifique-se de importar o tipo correto aqui

interface GetPaymentUseCaseResponse {
  payments: Pagamentos[];
}

export class GetPaymentUseCase {
  constructor(private PaymentsRepository: PaymentsRepository) {}

  async execute(): Promise<GetPaymentUseCaseResponse> {
    const payments = await this.PaymentsRepository.getPayments();

    return {
      payments,
    };
  }
}
