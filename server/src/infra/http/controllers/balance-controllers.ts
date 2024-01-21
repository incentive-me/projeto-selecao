import { Request, Response } from 'express'
import { BalanceUseCase } from '../../../application/use-cases/balance'

interface BalanceControllerInterface {
  createBalance(req: Request, res: Response): Promise<void>
  findAllBalances(req: Request, res: Response): Promise<void>
  deleteBalance(req: Request, res: Response): Promise<void>
  updateBalance(req: Request, res: Response): Promise<void>
  findBalanceById(req: Request, res: Response): Promise<void>
}

export class BalanceController implements BalanceControllerInterface {
  constructor(private balanceUseCase: BalanceUseCase) {
    this.balanceUseCase = balanceUseCase
  }

  async createBalance(req: Request, res: Response): Promise<void> {
    const { name, amount, description, userInfo } = req.body
    try {
      const newBalance = await this.balanceUseCase.createBalance(
        userInfo,
        name,
        amount,
        description
      )
      res.status(200).send(newBalance)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async findAllBalances(req: Request, res: Response): Promise<void> {
    const { userInfo } = req.body
    const { page, pageSize } = req.query
    try {
      const getAll = await this.balanceUseCase.findAllBalances(
        userInfo,
        Number(page),
        Number(pageSize)
      )
      res.status(200).send(getAll)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async deleteBalance(req: Request, res: Response): Promise<void> {
    const id = req.params.id

    try {
      await this.balanceUseCase.deleteBalance(id)
      res.status(200).send({ delete: true })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async updateBalance(req: Request, res: Response): Promise<void> {
    const { balance, name } = req.body
    try {
      const updateBalance = await this.balanceUseCase.updateBalance(balance, name)
      res.status(200).send(updateBalance)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async findBalanceById(req: Request, res: Response): Promise<void> {
    const id = req.params.id
    try {
      const balance = await this.balanceUseCase.findBalanceById(id)
      res.status(200).send(balance)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}
