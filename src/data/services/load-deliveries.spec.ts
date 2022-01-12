import { LoadDeliveriesService } from '@/data/services/load-deliveries'
import { OutputError } from '@/helpers/errors/output-error'
import { InputError } from '@/helpers/errors/input-error'
import { DbLoadDeliveriesRepository } from '@/data/contracts/db-load-deliveries-repository'
import { mockDeliveries } from '@/data/mocks/mock-deliveries'
import { DeliveryData } from '@/data/models/delivery-data'

class DbLoadDeliveriesRepositoryMock implements DbLoadDeliveriesRepository {
  callCount = 0
  identificationIds = []
  output = []

  async load(identificationIds: string[]): Promise<DeliveryData[]> {
    this.callCount++
    this.identificationIds = identificationIds
    return Promise.resolve(this.output)
  }
}

const makeSut = () => {
  const dbLoadDeliveriesRepositoryMock = new DbLoadDeliveriesRepositoryMock()
  const sut = new LoadDeliveriesService(dbLoadDeliveriesRepositoryMock)

  return { sut, dbLoadDeliveriesRepositoryMock }
}

describe('LoadDeliveriesService', () => {
  test('should return definied sut.init', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  test('should valid if identificationIds param is provided and call load method one time', async () => {
    const anyIds = ['any_ids']
    const { sut, dbLoadDeliveriesRepositoryMock } = makeSut()

    await sut.load(anyIds)

    expect(dbLoadDeliveriesRepositoryMock.callCount).toBe(1)
    expect(dbLoadDeliveriesRepositoryMock.identificationIds).toEqual(anyIds)
  })

  test('should return throws if identificationIds param is no provided', () => {
    const { sut } = makeSut()

    const promise = sut.load([])

    expect(promise).rejects.toThrow(
      new InputError('identificationIds cannot be empty')
    )
  })

  test('should return a list of deliveries if load method is called', async () => {
    const anyIds = ['any_ids']
    const deliveries = mockDeliveries()
    const { sut, dbLoadDeliveriesRepositoryMock } = makeSut()
    dbLoadDeliveriesRepositoryMock.output = deliveries

    const listOfDeliveries = await sut.load(anyIds)

    expect(listOfDeliveries).toEqual(deliveries)
  })

  test('should return throws if list of deliveries returns unknown identificationsIds', () => {
    const anyIds = ['any_ids']
    const deliveries = mockDeliveries()
    const { sut, dbLoadDeliveriesRepositoryMock } = makeSut()
    dbLoadDeliveriesRepositoryMock.output = deliveries
    dbLoadDeliveriesRepositoryMock.output[0].owner = 'unknown_id'

    const promise = sut.load(anyIds)

    expect(promise).rejects.toThrow(new OutputError('return with unknown ids'))
  })
})
