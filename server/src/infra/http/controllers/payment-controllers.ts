import { Request, Response } from 'express'
import { PaymentUseCase } from '../../../application/use-cases/payment'

interface PaymentControllerInterface {
  createPayment(req: Request, res: Response): Promise<void>
  findAllPayments(req: Request, res: Response): Promise<void>
  deletePayment(req: Request, res: Response): Promise<void>
  updatePayment(req: Request, res: Response): Promise<void>
}

export class PaymentController implements PaymentControllerInterface {
  constructor(private paymentUseCase: PaymentUseCase) {
    this.paymentUseCase = paymentUseCase
  }

  async createPayment(req: Request, res: Response): Promise<void> {
    const { userInfo, payment } = req.body

    try {
      const createPay = await this.paymentUseCase.createPayment(userInfo, payment)
      res.status(201).send(createPay)
    } catch (err) {
      res.status(400).json({ err: err.message })
    }
  }

  async findAllPayments(req: Request, res: Response): Promise<void> {
    const { userInfo } = req.body
    const { page, pageSize } = req.query
    try {
      const getAll = await this.paymentUseCase.findAllPayments(
        userInfo,
        Number(page),
        Number(pageSize)
      )
      res.status(200).send(getAll)
    } catch (err) {
      res.status(400).json({ err: err.message })
    }
  }

  async deletePayment(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      await this.paymentUseCase.deletePayment(id)
      res.status(200).json({ deleted: true })
    } catch (err) {
      res.status(400).json({ err: err.message })
    }
  }

  async updatePayment(req: Request, res: Response): Promise<void> {
    const { payment, name } = req.body

    try {
      const updatePayment = await this.paymentUseCase.updatePayment(payment, name)
      res.status(200).send(updatePayment)
    } catch (err) {
      res.status(400).json({ err: err.message })
    }
  }
}
