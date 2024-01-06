import { Request, Response } from "express";
import { BalanceUseCase } from "../application/balance.usecase";

interface BalanceControllerInterface {
    CreateBalanceController(req: Request, res: Response): Promise<void>
    GetAllBalancesController(req: Request, res: Response): Promise<void>
}

export class BalanceController implements BalanceControllerInterface {
    constructor(private balanceUseCase: BalanceUseCase) {
        this.balanceUseCase = balanceUseCase
    }

    async CreateBalanceController(req: Request, res: Response): Promise<void>{
        const { balanceName, amount, userInfo } = req.body
        try {
            const newBalance = await this.balanceUseCase.CreateBalance(userInfo, balanceName, amount)
            res.status(200).send(newBalance)
        } catch(err) {
            res.status(400).json({error: err.message})
        }
    }

    async GetAllBalancesController(req: Request, res: Response): Promise<void> {
        const { userInfo } = req.body

        try {
            const getAll = await this.balanceUseCase.GetAllBalances(userInfo)
            res.status(200).send(getAll)
        } catch(err) {
            res.status(400).json({error: err.message})
        }
    }
}