import { Router, Express } from 'express'

import { LoadDeliveriesService } from '@/data/services/load-deliveries'
import { MongoDBLoadDeliveries } from '@/infra/repositories/mongo/load-deliveries'
import { LoadDeliveriesController } from '@/presentation/controllers/load-deliveries'

export const setupDeliveriesRoute = (app: Express): void => {
  const router = Router()

  router.get('/', async (req, res) => {
    const mongoDbLoadDeliveries = new MongoDBLoadDeliveries()
    const loadDeliveriesService = new LoadDeliveriesService(
      mongoDbLoadDeliveries
    )
    const loadDeliveriesController = new LoadDeliveriesController(
      loadDeliveriesService
    )

    const response = await loadDeliveriesController.handle({
      params: { identificationIds: ['any_ids'] },
    })

    if (response.type === 'success') {
      res.send(response)
    } else {
      res.status(404).send(response)
    }
  })

  app.use('/deliveries', router)
}
