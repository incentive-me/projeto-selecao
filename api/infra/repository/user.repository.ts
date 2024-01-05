import { UserUseCase } from "../../application/user.usecase";
import { User } from "../../domain/user.entity";

interface UserInterfaceRepo {
  CreateUserRepo(user: User): Promise<User | Error>;
}

export default class UserRepository implements UserInterfaceRepo { 
  constructor(private userUsecase: UserUseCase) {
    this.userUsecase = userUsecase
  }

  async CreateUserRepo(user: User): Promise<User | Error> {
    const verify = await this.userUsecase.CreateUser(user)
    return verify
  }

}
