import { Router } from 'express'
import { UserHandler } from './Handler'

const router = Router()

const userHandler = new UserHandler()

router.route('/').get((req, res) => {
  res.send('Hello World!')
})

router.route('/login').get(userHandler.login.bind(userHandler))

export { router }
