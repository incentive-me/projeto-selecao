import { Request, Response } from "express";
import { PaymentUseCase } from "../application/payment.usecase";

interface PaymentControllerInterface {
    CreatePayment(req: Request, res: Response): Promise<void>    
}

export class PaymentController implements PaymentControllerInterface {
    constructor(private paymentUseCase: PaymentUseCase) {
        this.paymentUseCase = paymentUseCase
    }

    async CreatePayment(req: Request, res: Response): Promise<void> {
        const { userInfo, payment } = req.body

        try {
            const createPay = await this.paymentUseCase.CreatePayment(userInfo, payment)
            res.status(201).send(createPay)
        } catch(err) {
            res.status(400).json({err: err.message})
        }
    }
}

