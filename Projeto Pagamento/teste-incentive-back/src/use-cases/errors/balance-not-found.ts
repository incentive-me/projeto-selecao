export class BalanceNotFoundError extends Error {
  constructor() {
    super("balance not found");
  }
}
