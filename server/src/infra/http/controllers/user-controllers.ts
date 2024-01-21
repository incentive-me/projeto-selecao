import { User } from '../../../application/entities/user'
import { UserUseCase } from '../../../application/use-cases/user'

import { Request, Response } from 'express'

interface UserControllerInterface {
  createUser(req: Request, res: Response): Promise<void>
  loginUser(req: Request, res: Response): Promise<void>
  findUserById(req: Request, res: Response): Promise<void>
}

export class UserController implements UserControllerInterface {
  constructor(private userUseCase: UserUseCase) {
    this.userUseCase = userUseCase
  }

  async createUser(req: Request, res: Response) {
    const user: User = req.body

    try {
      const newUser = await this.userUseCase.createUser(user)
      res.status(201).send(newUser)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body
    try {
      const login = await this.userUseCase.getUser(email, password ?? '')
      res.status(200).send(login)
    } catch (err) {
      console.error(err.message)
      res.status(400).json({ error: err.message })
    }
  }

  async findUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    try {
      const getUserById = await this.userUseCase.findUserById(id)
      res.status(200).send(getUserById)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}
