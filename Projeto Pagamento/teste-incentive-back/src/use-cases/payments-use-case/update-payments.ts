import { Pagamentos } from "@prisma/client";
import { PaymentsRepository } from "../../repositories/payments-repository";

interface UpdatePaymentUseCaseRequest {
  paymentID: string;
  newName: string;
}

export class UpdatePaymentUseCase {
  constructor(private PaymentsRepository: PaymentsRepository) {}

  async execute({ paymentID, newName }: UpdatePaymentUseCaseRequest) {
    try {
      const payment = await this.PaymentsRepository.updatePayments(
        paymentID,
        newName
      );

      return {
        payment,
      };
    } catch (error) {
      return console.log(error);
    }
  }
}
