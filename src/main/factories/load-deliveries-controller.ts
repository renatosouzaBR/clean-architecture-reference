import { Controller } from '@/presentation/contracts/controller'
import { LoadDeliveriesService } from '@/data/services/load-deliveries'
import { MongoDBLoadDeliveries } from '@/infra/repositories/mongo/load-deliveries'
import { LoadDeliveriesController } from '@/presentation/controllers/load-deliveries'

export const makeLoadDeliveriesController = (): Controller => {
  const mongoDbLoadDeliveries = new MongoDBLoadDeliveries()
  const loadDeliveriesService = new LoadDeliveriesService(mongoDbLoadDeliveries)
  return new LoadDeliveriesController(loadDeliveriesService)
}
