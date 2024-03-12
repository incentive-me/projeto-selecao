import type { NextFunction, Request, Response } from 'express'

export class UserHandler {
  public async login(request: Request, response: Response, next: NextFunction) {
    try {
      response.send('Hello world')
    } catch (error) {
      console.log(error)

      next(error)
    }
  }
}
