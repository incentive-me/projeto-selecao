import { User, UserAndToken, UserInterface } from "../domain/user.entity";
import { v4 as uuidv4 } from "uuid";
import bcrypt  from 'bcryptjs'
import jwt from 'jsonwebtoken'
import UserRepository from "../infra/repository/user.repository";

export class UserUseCase implements UserInterface {
  constructor(private userRepository: UserRepository){
    this.userRepository = userRepository
  }

  async CreateUser(user: User): Promise<UserAndToken | Error> {
    const id = uuidv4();
    user.id = id
    
    const userValid = UserUseCase.validateUser(user);
    if (!userValid) {
      throw Error("User is not valid");
    }

    const encryptePassword = await bcrypt.hash(user.password, 10)
    user.password = encryptePassword

    const repo = await this.userRepository.CreateUserRepo(user)

    const token = jwt.sign({ id: user.id, email: user.email}, "secret", {expiresIn: "2h"})
  
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token: token
    }
  }

  async GetUser(email: string, password: string): Promise<UserAndToken | Error> {
    const repo = await this.userRepository.LoginUserRepo(email, password)

    if(repo) {
      const verify = await bcrypt.compare(password, repo[0].password)

      if (!verify) {
        throw Error("Email or Password invalid")
      }
    }
    const token = jwt.sign({ id: repo[0].id, email: repo[0].email}, "secret", {expiresIn: "2h"})
    return {
      user: {
        id: repo.id,
        name: repo.name,
        email: repo.email
      }, 
      token: token
    }
  }

  UpdateUser(user: User): User | Error {
     const userValid = UserUseCase.validateUser(user);
    if (userValid) {
      return user;
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
