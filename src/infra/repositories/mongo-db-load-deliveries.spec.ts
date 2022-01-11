import { DbLoadDeliveriesRepository } from '@/data/contracts/db-load-deliveries-repository'
import { Delivery } from '@/domain/entities/delivery'
import { DeliveryModel } from '@/infra/models/delivery-schema'
import { mockMongoDeliveries } from '@/infra/tests/mockMongoDeliveries'

class MongoDBLoadDeliveries implements DbLoadDeliveriesRepository {
  load(identificationIds: string[]): Promise<Delivery[]> {
    return Promise.resolve([])
  }
}

describe('MongoDBLoadDeliveries', () => {
  test('should call sut.init sucessfully', () => {
    const mongoDBLoadDeliveries = new MongoDBLoadDeliveries()

    expect(mongoDBLoadDeliveries).toBeDefined()
  })

  test('should return a empty list when call load method', async () => {
    const mongoDBLoadDeliveries = new MongoDBLoadDeliveries()

    const deliveries = await mongoDBLoadDeliveries.load([])

    expect(deliveries).toEqual([])
  })
})
