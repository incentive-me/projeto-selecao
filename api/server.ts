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

const app = express()
app.use(express.json())
app.use(cors())

const userRepo = new UserRepository()
const userUseCase = new UserUseCase(userRepo)
const userController = new UserController(userUseCase)

const balanceRepo = new BalanceRepository()
const balanceUseCase = new BalanceUseCase(balanceRepo)
const balanceController = new BalanceController(balanceUseCase)

app.delete("/balance/:id", middlewareJWT, (req, res) => balanceController.DeleteBalanceController(req, res))
app.patch("/balance", middlewareJWT, (req, res) => balanceController.UpdateBalanceNameController(req, res))
app.get("/balance", middlewareJWT, (req, res) => balanceController.GetAllBalancesController(req, res))
app.post("/balance", middlewareJWT, (req, res) => balanceController.CreateBalanceController(req, res))
app.post("/user", middlewareJWT, (req, res) => userController.CreateUser(req, res))
app.post("/login", (req, res) => userController.LoginUser(req, res))


app.get("/user", (req: Request, res: Response) => {
    return res.status(200).send("Hello Wordo")
})

app.listen(3001, () => {
    console.log("Server is running on port 3001")
})