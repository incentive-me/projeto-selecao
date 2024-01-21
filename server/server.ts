import express from 'express'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import cors from 'cors'

import { middlewareJWT } from './src/middleware'

import { UserUseCase } from './src/application/use-cases/user'
import UserRepository from './src/infra/repositories/user-repository'
import { UserController } from './src/infra/http/controllers/user-controllers'

import BalanceRepository from './src/infra/repositories/balance-repository'
import { BalanceUseCase } from './src/application/use-cases/balance'
import { BalanceController } from './src/infra/http/controllers/balance-controllers'

import { PaymentRepository } from './src/infra/repositories/payment-repository'
import { PaymentUseCase } from './src/application/use-cases/payment'
import { PaymentController } from './src/infra/http/controllers/payment-controllers'

dotenv.config()
const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())

const userRepo = new UserRepository(prisma)
const userUseCase = new UserUseCase(userRepo)
const userController = new UserController(userUseCase)

const balanceRepo = new BalanceRepository(prisma)
const balanceUseCase = new BalanceUseCase(balanceRepo)
const balanceController = new BalanceController(balanceUseCase)

const paymentRepository = new PaymentRepository(prisma)
const paymentUseCase = new PaymentUseCase(paymentRepository)
const paymentController = new PaymentController(paymentUseCase)

app.post('/user', (req, res) => userController.createUser(req, res))
app.get('/user/:id', middlewareJWT, (req, res) => userController.findUserById(req, res))
app.post('/login', (req, res) => userController.loginUser(req, res))

app.delete('/balance/:id', middlewareJWT, (req, res) => balanceController.deleteBalance(req, res))
app.patch('/balance', middlewareJWT, (req, res) => balanceController.updateBalance(req, res))
app.get('/balance', middlewareJWT, (req, res) => balanceController.findAllBalances(req, res))
app.post('/balance', middlewareJWT, (req, res) => balanceController.createBalance(req, res))
app.get('/balance/:id', middlewareJWT, (req, res) => balanceController.findBalanceById(req, res))

app.get('/payment/', middlewareJWT, (req, res) => paymentController.findAllPayments(req, res))
app.post('/payment', middlewareJWT, (req, res) => paymentController.createPayment(req, res))
app.delete('/payment/:id', middlewareJWT, (req, res) => paymentController.deletePayment(req, res))
app.patch('/payment', middlewareJWT, (req, res) => paymentController.updatePayment(req, res))

app.listen(8080, () => {
  console.info('Server is running on port 8080')
})
