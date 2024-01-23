export class BalanceWithPaymentError extends Error {
  constructor() {
    super("Payment linked to this balance.");
  }
}
