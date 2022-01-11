import { DbLoadDeliveriesRepository } from '@/data/contracts/db-load-deliveries-repository'
import { Delivery } from '@/domain/entities/delivery'
import { DeliveryModel } from '@/infra/models/delivery-schema'
import { mockMongoDeliveries } from '@/infra/tests/mockMongoDeliveries'

class MongoDBLoadDeliveries implements DbLoadDeliveriesRepository {
  async load(identificationIds: string[]): Promise<Delivery[]> {
    const deliveryList = await DeliveryModel.find({})

    return deliveryList.map((delivery) => ({
      id: delivery._id,
      ...delivery,
    }))
  }
}

const makeSut = () => {
  const sut = new MongoDBLoadDeliveries()

  return { sut }
}

describe('MongoDBLoadDeliveries', () => {
  test('should call sut.init sucessfully', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  test('should return a empty list when call load method', async () => {
    const { sut } = makeSut()
    DeliveryModel.find = jest.fn().mockResolvedValue([])

    const deliveries = await sut.load([])

    expect(deliveries).toEqual([])
  })

  test('should return a list of deliveries when call load method', async () => {
    const { sut } = makeSut()
    DeliveryModel.find = jest.fn().mockResolvedValue(mockMongoDeliveries(2))

    const deliveries = await sut.load([])

    expect(deliveries.length).toBe(2)
  })
})
