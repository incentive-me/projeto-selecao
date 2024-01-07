import { Request, Response } from "express";
import { BalanceUseCase } from "../application/balance.usecase";

interface BalanceControllerInterface {
    CreateBalanceController(req: Request, res: Response): Promise<void>
    GetAllBalancesController(req: Request, res: Response): Promise<void>
    DeleteBalanceController(req: Request, res: Response): Promise<void>
    UpdateBalanceNameController(req: Request, res: Response): Promise<void>
}

export class BalanceController implements BalanceControllerInterface {
    constructor(private balanceUseCase: BalanceUseCase) {
        this.balanceUseCase = balanceUseCase
    }

    async CreateBalanceController(req: Request, res: Response): Promise<void>{
        const { balanceName, amount, description, userInfo } = req.body
        try {
            const newBalance = await this.balanceUseCase.CreateBalance(userInfo, balanceName, amount, description)
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

    async DeleteBalanceController(req: Request, res: Response): Promise<void> {
        const id = req.params.id

        try {
            const deleteBalance = await this.balanceUseCase.DeleteBalance(id)
            res.status(200).send({delete: true})
        } catch(err) {
            res.status(400).json({error: err.message})
        }
    }

    async UpdateBalanceNameController(req: Request, res: Response): Promise<void> {
        const { balance, newName } = req.body

        try {
            const updateBalance = await this.balanceUseCase.UpdateBalanceName(balance, newName)
            res.status(200).send(updateBalance)
        } catch(err) {
            res.status(400).json({error: err.message})
        }
    }
}