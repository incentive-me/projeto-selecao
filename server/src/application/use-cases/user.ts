import { User, UserAndToken, UserInfo, UserInterface } from '../../application/entities/user'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import UserRepository from '../../infra/repositories/user-repository'
import { UserValidator } from '../../helpers/user-validation'

export class UserUseCase implements UserInterface {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async createUser(user: User): Promise<UserAndToken | Error> {
    const id = uuidv4()
    const encryptePassword = await bcrypt.hash(user.password, 10)
    user.id = id
    user.password = encryptePassword

    try {
      UserValidator.validateUser(user)
    } catch (error) {
      return Promise.reject(error)
    }

    await this.userRepository.createUser(user)

    const jwtSecret: string = process.env.SECRETJWT ?? ''
    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '2h' })

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: token,
    }
  }

  async getUser(email: string, password: string): Promise<UserAndToken | Error> {
    const repo = await this.userRepository.loginUser(email, password)

    if (repo) {
      const verify = await bcrypt.compare(password, repo.password)
      if (!verify) {
        throw Error('Email or Password invalid')
      }
    }
    const jwtSecret: string = process.env.SECRETJWT ? process.env.SECRETJWT : ''
    const token = jwt.sign({ id: repo.id, email: repo.email }, jwtSecret, { expiresIn: '2h' })

    return {
      user: {
        id: repo.id,
        name: repo.name,
        email: repo.email,
      },
      token: token,
    }
  }

  updateUser(user: User) {
    try {
      UserValidator.validateUser(user)
    } catch (error) {
      return Promise.reject(error) as any
    }
  }

  async findUserById(id: string): Promise<User | Error> {
    if (!id) {
      throw Error('User not found with this id')
    }
    return await this.userRepository.findUserById(id)
  }
}
