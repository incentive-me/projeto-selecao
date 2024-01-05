import { UserUseCase } from "../../application/user.usecase";
import { User } from "../../domain/user.entity";

interface UserInterfaceRepo {
  CreateUserRepo(user: User): User | Error;
}

export class UserRepository implements UserInterfaceRepo {
  userService: UserUseCase;

  constructor(userService: UserUseCase) {
    this.userService = userService;
  }

  CreateUserRepo(user: User): User | Error {
    const verifyUser = this.userService.CreateUser(user);
    return verifyUser;
  }
}
