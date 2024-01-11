import { User, UserAndToken, UserInfo, UserInterface } from "../domain/user.entity";
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
        id: repo[0].id,
        name: repo[0].name,
        email: repo[0].email
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

  async GetUserById(userInfo: UserInfo): Promise<User | Error>{
    if (!userInfo.id) {
      throw Error("User is invalid");
    }

    const getUser = await this.userRepository.getUserById(userInfo.id)
    return getUser
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

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const verifyEmail = user.email.match(emailRegex)

    if (!verifyEmail) {
      throw Error("Email is not valid");
    }

    if (!user.password) {
      throw Error("Password is required");
    }

    return user;
  }
}
