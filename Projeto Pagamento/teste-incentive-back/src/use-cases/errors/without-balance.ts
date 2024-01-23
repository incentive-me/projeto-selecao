export class WithoutBalanceError extends Error {
  constructor() {
    super("Insufficient balance");
  }
}
