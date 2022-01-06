import { Delivery } from '@/domain/entities/delivery'
import { LoadDeliveries } from '@/domain/usecases/load-deliveries'

class DbLoadDeliveries implements LoadDeliveries {
  constructor(
    private readonly dbLoadDeliveriesRepository: DbLoadDeliveriesRepository
  ) {}

  load(identificationIds: string[]): Delivery[] {
    return this.dbLoadDeliveriesRepository.load(identificationIds)
  }
}

interface DbLoadDeliveriesRepository {
  load(identificationIds: string[]): Delivery[]
}

class DbLoadDeliveriesRepositoryMock implements DbLoadDeliveriesRepository {
  callCount = 0
  identificationIds = []

  load(identificationIds: string[]): Delivery[] {
    this.callCount++
    this.identificationIds = identificationIds
    return []
  }
}

const makeSut = () => {
  const dbLoadDeliveriesRepositoryMock = new DbLoadDeliveriesRepositoryMock()
  const sut = new DbLoadDeliveries(dbLoadDeliveriesRepositoryMock)

  return { sut, dbLoadDeliveriesRepositoryMock }
}

describe('DBLoadDeliveries', () => {
  test('should return definied sut.init', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  test('should valid if identificationIds param is provided and call load method one time', () => {
    const anyIds = ['any_ids']
    const { sut, dbLoadDeliveriesRepositoryMock } = makeSut()

    sut.load(anyIds)

    expect(dbLoadDeliveriesRepositoryMock.callCount).toBe(1)
    expect(dbLoadDeliveriesRepositoryMock.identificationIds).toEqual(anyIds)
  })
})
