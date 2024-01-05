import { UserUseCase } from "../../application/user.usecase";
import { User } from "../../domain/user.entity";
import { connection } from "../db/mysql";

interface UserInterfaceRepo {
  CreateUserRepo(user: User): Promise<User | Error>;
  LoginUserRepo(email: string, password: string): Promise<any>;
}

export default class UserRepository implements UserInterfaceRepo { 

  async CreateUserRepo(user: User): Promise<User | Error> {
    const { id, name, email, password } = user

    const [rows] = await connection.promise().query(
      `INSERT INTO user (id, name, email, password) 
      VALUES (?, ?, ?, ?)`, [id, name, email, password]
    )
    return user
  }

  async LoginUserRepo(email: string, password: string): Promise<any> {
      
    const [rows] = await connection.promise().query(
      `SELECT * FROM user WHERE email = ?`, [email]
    )
    return rows
  }
}
