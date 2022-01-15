import { Router, Express } from 'express'

import { makeLoadDeliveriesController } from '@/main/factories/load-deliveries-controller'
import { adaptRoute } from '@/main/express/route-adapter'

export const setupDeliveriesRoute = (app: Express): void => {
  const router = Router()

  router.get('/', adaptRoute(makeLoadDeliveriesController()))

  app.use('/deliveries', router)
}
