import { Delivery } from '@/domain/entities/delivery'
import { OutputError } from '@/data/helpers/output-error'
import { InputError } from '@/data//helpers/input-error'
import { DbLoadDeliveriesRepository } from '@/data/contracts/db-load-deliveries-repository'
import { DbLoadDeliveries } from '@/data/services/db-load-deliveries'

class DbLoadDeliveriesRepositoryMock implements DbLoadDeliveriesRepository {
  callCount = 0
  identificationIds = []
  output = []

  load(identificationIds: string[]): Delivery[] {
    this.callCount++
    this.identificationIds = identificationIds
    return this.output
  }
}

const makeSut = () => {
  const dbLoadDeliveriesRepositoryMock = new DbLoadDeliveriesRepositoryMock()
  const sut = new DbLoadDeliveries(dbLoadDeliveriesRepositoryMock)

  return { sut, dbLoadDeliveriesRepositoryMock }
}

const mockDeliveries = () => {
  return [
    {
      id: 'ajshd123123',
      document: '123',
      destination: {
        name: 'Joao',
        city: 'Londrina',
        state: 'PR',
      },
      owner: 'any_ids',
    },
    {
      id: 'ajshd123122',
      document: '123',
      destination: {
        name: 'Joao',
        city: 'Londrina',
        state: 'PR',
      },
      owner: 'any_ids',
    },
    {
      id: 'ajshd123126',
      document: '123',
      destination: {
        name: 'Joao',
        city: 'Londrina',
        state: 'PR',
      },
      owner: 'any_ids',
    },
  ]
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

  test('should return throws if identificationIds param is no provided', () => {
    const { sut } = makeSut()

    expect(() => {
      sut.load([])
    }).toThrow(new InputError('identificationIds cannot be empty'))
  })

  test('should return a list of deliveries if load method is called', () => {
    const anyIds = ['any_ids']
    const deliveries = mockDeliveries()
    const { sut, dbLoadDeliveriesRepositoryMock } = makeSut()
    dbLoadDeliveriesRepositoryMock.output = deliveries

    const listOfDeliveries = sut.load(anyIds)

    expect(listOfDeliveries).toEqual(deliveries)
  })

  test('should return throws if list of deliveries returns unknown identificationsIds', () => {
    const anyIds = ['any_ids']
    const deliveries = mockDeliveries()
    const { sut, dbLoadDeliveriesRepositoryMock } = makeSut()
    dbLoadDeliveriesRepositoryMock.output = deliveries
    dbLoadDeliveriesRepositoryMock.output[0].owner = 'unknown_id'

    expect(() => {
      sut.load(anyIds)
    }).toThrow(new OutputError('return with unknown ids'))
  })
})
