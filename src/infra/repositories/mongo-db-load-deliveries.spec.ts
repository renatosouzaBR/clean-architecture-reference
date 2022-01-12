import { InputError } from '@/data/helpers/input-error'
import { DeliveryModel } from '@/infra/models/delivery-schema'
import { mockMongoDeliveries } from '@/infra/tests/mockMongoDeliveries'
import { MongoDBLoadDeliveries } from '@/infra/repositories/mongo-db-load-deliveries'

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

    const deliveries = await sut.load(['any_ids'])

    expect(deliveries).toEqual([])
  })

  test('should return a list of deliveries when call load method', async () => {
    const { sut } = makeSut()
    DeliveryModel.find = jest.fn().mockResolvedValue(mockMongoDeliveries(2))

    const deliveries = await sut.load(['any_ids'])

    expect(deliveries.length).toBe(2)
  })

  test('should throw if identificationIds if not provided', () => {
    const { sut } = makeSut()

    const promise = sut.load([])

    expect(promise).rejects.toThrow(
      new InputError('identificationIds cannot be empty')
    )
  })

  test('should valid if identificationIds is provided and load method called one time', async () => {
    const { sut } = makeSut()
    DeliveryModel.find = jest.fn().mockResolvedValue(mockMongoDeliveries(2))

    await sut.load(['any_ids'])

    expect(DeliveryModel.find).toHaveBeenCalledWith({ _id: ['any_ids'] })
    expect(DeliveryModel.find).toHaveBeenCalledTimes(1)
  })
})
