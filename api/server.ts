import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'

import { UserUseCase } from './application/user.usecase'
import UserRepository from './infra/repository/user.repository'
import { UserController } from './presentation/user.controller'
import { middlewareJWT } from './presentation/middleware'
import { BalanceController } from './presentation/balance.controller'
import { BalanceUseCase } from './application/balance.usecase'
import BalanceRepository from './infra/repository/balance.repository'
import { PaymentUseCase } from './application/payment.usecase'
import { PaymentController } from './presentation/payment.controller'
import { PaymentRepository } from './infra/repository/payment.repository'

const app = express()
app.use(express.json())
app.use(cors())

const userRepo = new UserRepository()
const userUseCase = new UserUseCase(userRepo)
const userController = new UserController(userUseCase)

const balanceRepo = new BalanceRepository()
const balanceUseCase = new BalanceUseCase(balanceRepo)
const balanceController = new BalanceController(balanceUseCase)

const paymentRepository = new PaymentRepository()
const paymentUseCase = new PaymentUseCase(paymentRepository)
const paymentController = new PaymentController(paymentUseCase)

app.post("/user", (req, res) => userController.CreateUser(req, res))
app.get("/user", middlewareJWT, (req, res) => userController.GetUserById(req, res))
app.post("/login", (req, res) => userController.LoginUser(req, res))

app.delete("/balance/:id", middlewareJWT, (req, res) => balanceController.DeleteBalanceController(req, res))
app.patch("/balance", middlewareJWT, (req, res) => balanceController.UpdateBalanceNameController(req, res))
app.get("/balance", middlewareJWT, (req, res) => balanceController.GetAllBalancesController(req, res))
app.post("/balance", middlewareJWT, (req, res) => balanceController.CreateBalanceController(req, res))

app.get("/payment", middlewareJWT, (req, res) => paymentController.GetAllPayments(req, res))
app.post("/payment", middlewareJWT, (req, res) => paymentController.CreatePayment(req, res))
app.delete("/payment/:id", middlewareJWT, (req, res) => paymentController.DeletePayment(req, res))
app.patch("/payment", middlewareJWT, (req, res) => paymentController.UpdatePaymentName(req, res))

app.get("/user", (req: Request, res: Response) => {
    return res.status(200).send("Hello Wordo")
})

app.listen(3001, () => {
    console.log("Server is running on port 3001")
})