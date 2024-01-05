import { User } from "../domain/user.entity";
import UserRepository from "../infra/repository/user.repository";
import { Request, Response } from "express";

interface UserControllerInterface {
  CreateUser(req: Request, res: Response): Promise<void>;
}

export class UserController implements UserControllerInterface {

    constructor(private userRepo: UserRepository) {
      this.userRepo = userRepo
    }
    
    async CreateUser(req: Request, res: Response) {
      const user: User = req.body;

      try {
        const newUser = await this.userRepo.CreateUserRepo(user)
        res.status(200).send(newUser)

      } catch(err) {
        res.status(400).json({error: err.message})
      }
  }
}
