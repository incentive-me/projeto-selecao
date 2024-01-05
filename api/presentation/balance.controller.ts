import { Request, Response } from "express";

interface BalanceControllerInterface {
    CreateBalanceController(req: Request, res: Response): Promise<void>
}

export class BalanceController implements BalanceControllerInterface {
    // constructor(private balanceUseCase: BalanceController) {
    //     this.balanceUseCase = balanceUseCase
    // }

    async CreateBalanceController(req: Request, res: Response): Promise<void>{
        const { balanceName, amount, userInfo } = req.body
        console.log("esse é o REQ.BODY", balanceName, amount, userInfo)
        try {
            res.status(200).send(req.body)
        } catch(err) {
            res.status(400).json({error: err.message})
        }
    }
}