export class UserInvalidEmailError extends Error {
  constructor() {
    super("Invalid email or password.");
  }
}
