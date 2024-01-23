export class PaymentNotFoundError extends Error {
  constructor() {
    super("Payment not found");
  }
}
