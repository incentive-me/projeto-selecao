export type User = {
  id: string
  name: string
  email: string
  password: string
}

export type UserInfo = {
  id: string
  email: string
  iat: number
  exp: number
}

export type UserAndToken = {
  user: Omit<User, 'password'>
  token: string
}

export interface UserInterface {
  createUser(user: User): Promise<UserAndToken | Error>
  updateUser(user: User): User | Error
  getUser(email: string, password: string): Promise<UserAndToken | Error>
  findUserById(id: string): Promise<User | Error>
}
