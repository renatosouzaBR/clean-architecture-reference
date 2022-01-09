import { DbLoadDeliveriesRepository } from '@/data/contracts/db-load-deliveries-repository'
import { Delivery } from '@/domain/entities/delivery'

class MongoDBLoadDeliveries implements DbLoadDeliveriesRepository {
  load(identificationIds: string[]): Delivery[] {
    return []
  }
}

describe('MongoDBLoadDeliveries', () => {
  test('should call sut.init sucessfully', () => {
    const mongoDBLoadDeliveries = new MongoDBLoadDeliveries()

    expect(mongoDBLoadDeliveries).toBeDefined()
  })

  test('should return a empty list when call load method', () => {
    const mongoDBLoadDeliveries = new MongoDBLoadDeliveries()

    const deliveries = mongoDBLoadDeliveries.load([])

    expect(deliveries).toEqual([])
  })
})
