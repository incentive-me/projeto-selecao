import { PrismaClient } from '@prisma/client'
import { User } from '../../application/entities/user'

interface UserInterfaceRepo {
  createUser(user: User): Promise<User | Error>
  loginUser(email: string, password: string): Promise<any>
  findUserById(id: string): Promise<User | Error>
}

export default class UserRepository implements UserInterfaceRepo {
  constructor(private prisma: PrismaClient) {
    this.prisma = new PrismaClient()
  }

  async createUser(user: User): Promise<User | Error> {
    const { id, name, email, password } = user
    const newUser = await this.prisma.user.create({
      data: {
        id: id,
        name: name,
        email: email,
        password: password,
      },
    })
    return newUser as User
  }

  async loginUser(email: string, password?: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    })
    return user
  }

  async findUserById(id: string): Promise<User | Error> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    })
    return user as User
  }
}
