import { User, UserInterface } from "../domain/user.entity";
import { v4 as uuidv4 } from "uuid";

export class UserUseCase implements UserInterface {
  CreateUser(user: User): User | Error {
    const id = uuidv4();
    user.id = id;
    const userValid = UserUseCase.validateUser(user);
    if (userValid) {
      return user;
    }
    return new Error("User is not valid");
  }

  UpdateUser(user: User): User | Error {
    if (!user.id) {
      return new Error("Id is required");
    }

    const userValid = UserUseCase.validateUser(user);
    if (userValid) {
      return user;
    }
    return new Error("User is not valid");
  }

  GetUser(user: User): User | Error {
    if (!user.id) {
      return new Error("Id is required");
    }

    const validUser = UserUseCase.validateUser(user);
    if (validUser) {
      return validUser;
    }
    return new Error("User is not valid");
  }

  static validateUser(user: User): User | Error {
    if (!user.name) {
      return new Error("Name is required");
    }

    if (!user.email) {
      return new Error("Email is required");
    }

    if (!user.password) {
      return new Error("Password is required");
    }

    return user;
  }
}
