import { UserUseCase } from "../application/user.usecase";
import { User } from "../domain/user.entity";
import { Request, Response } from "express";

interface UserControllerInterface {
  CreateUser(req: Request, res: Response): Promise<void>;
  LoginUser(req: Request, res: Response): Promise<void>;
  GetUserById(req: Request, res: Response): Promise<void>;
}

export class UserController implements UserControllerInterface {

    constructor(private userUseCase: UserUseCase) {
      this.userUseCase = userUseCase
    }
    
    async CreateUser(req: Request, res: Response) {
        const user: User = req.body;
      
        try {
          const newUser = await this.userUseCase.CreateUser(user)
          res.status(201).send(newUser)

        } catch(err) {
          res.status(400).json({error: err.message})
        }
    }

    async LoginUser(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body
  
        try {
           const login = await this.userUseCase.GetUser(email, password)
           res.status(200).send(login)

        } catch(err) {
          res.status(400).json({error: err.message})
        }
    }

    async GetUserById(req: Request, res: Response): Promise<void>{
      const { userInfo } = req.body

      try {
        const getUserById = await this.userUseCase.GetUserById(userInfo)
        res.status(200).send(getUserById)
      } catch(err) {
        res.status(400).json({error: err.message})
      }

    }
}
