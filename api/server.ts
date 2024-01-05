import express, { Request, Response } from 'express'
import { UserUseCase } from './application/user.usecase'
import UserRepository from './infra/repository/user.repository'
import { UserController } from './presentation/user.controller'

const app = express()

app.use(express.json())

const userUseCase = new UserUseCase()
const userRepo = new UserRepository(userUseCase)
const userController = new UserController(userRepo)

app.post("/user", (req, res) => userController.CreateUser(req, res))

// const user = userRepo.CreateUserRepo({
//     id: "123",
//     name: "Oséias Costa",
//     email: "osieas2@gmail.com",
//     password: "1234"
// })

app.get("/user", (req: Request, res: Response) => {
    return res.status(200).send("Hello Wordo")
})

app.listen(3001, () => {
    console.log("Server is running on port 3000")
})