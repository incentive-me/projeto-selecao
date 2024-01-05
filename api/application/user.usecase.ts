import { User, UserInterface } from "../domain/user.entity";
import { v4 as uuidv4 } from "uuid";
import bcrypt  from 'bcryptjs'

export class UserUseCase implements UserInterface {

  async CreateUser(user: User): Promise<User | Error> {
    const id = uuidv4();
    user.id = id;

    const encryptePassword = await bcrypt.hash(user.password, 10)
    user.password = encryptePassword

    const userValid = UserUseCase.validateUser(user);
    if (userValid) {
      return userValid;
    }
    throw Error("User is not valid");
  }

  UpdateUser(user: User): User | Error {
     const userValid = UserUseCase.validateUser(user);
    if (userValid) {
      return user;
    }
    throw Error("User is not valid");
  }

  GetUser(user: User): User | Error {
    const validUser = UserUseCase.validateUser(user);
    if (validUser) {
      return validUser;
    }
    throw Error("User is not valid");
  }

  static validateUser(user: User): User | Error {
    if (!user.id) {
      throw Error("Id is required");
    }

    if (!user.name) {
      throw Error("Name is required");
    }

    if (!user.email) {
      throw Error("Email is required");
    }

    if (!user.password) {
      throw Error("Password is required");
    }

    return user;
  }
}
