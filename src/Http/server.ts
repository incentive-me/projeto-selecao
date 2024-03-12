import express from 'express'
import { router } from './routes'

const httpServer = express()

httpServer.use(router)
httpServer.set('port', Boolean(process.env.APP_PORT) || 3000)

httpServer.listen(httpServer.get('port'), async () => {
  console.info(
    'App is running at http://localhost:%d in %s mode',
    httpServer.get('port'),
    httpServer.get('env')
  )

  // await mongoDatabase.validate()
})
