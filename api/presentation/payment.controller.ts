import { Request, Response } from "express";
import { PaymentUseCase } from "../application/payment.usecase";

interface PaymentControllerInterface {
    CreatePayment(req: Request, res: Response): Promise<void>
    GetAllPayments(req: Request, res: Response): Promise<void>
    DeletePayment(req: Request, res: Response): Promise<void> 
    UpdatePaymentName(req: Request, res: Response): Promise<void>   
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

    async GetAllPayments(req: Request, res: Response): Promise<void>{
        const { userInfo } = req.body

        try {
            const getAll = await this.paymentUseCase.GetAllPayments(userInfo)
            res.status(200).send(getAll)
        } catch(err) {
            res.status(400).json({err: err.message})
        }
    }

    async DeletePayment(req: Request, res: Response): Promise<void>{
        const id = req.params.id

        try {
            const deletePayment = await this.paymentUseCase.DeletePayment(id)
            res.status(200).json({deleted: true})
        } catch(err) {
            res.status(400).json({err: err.message})
        }
    }

    async UpdatePaymentName(req: Request, res: Response): Promise<void>{
        const { payment, newName } = req.body

        try {
            const updatePayment = await this.paymentUseCase.UpdatePaymentName(payment, newName)
            res.status(200).send(updatePayment)
        } catch(err) {
            res.status(400).json({err: err.message})
        }
    }
}

