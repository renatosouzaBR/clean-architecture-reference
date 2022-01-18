import { Delivery } from '@/domain/entities/delivery'
import { LoadDeliveries } from '@/domain/usecases/load-deliveries'
import { MissingParamError } from '@/helpers/errors/missing-param-error'
import { makeDeliveryFake } from '@/helpers/mocks/mock-delivery'
import { mockReturnedArray } from '@/helpers/mocks/mock-returned-array'
import { LoadDeliveriesController } from '@/presentation/controllers/load-deliveries'

class LoadDeliveriesUseCaseSpy implements LoadDeliveries {
  output = []
  identificationIds = []
  countCount = 0

  load(identificationIds: string[]): Promise<Delivery[]> {
    this.identificationIds = identificationIds
    this.countCount++
    return Promise.resolve(this.output)
  }
}

const makeSut = () => {
  const loadDeliveriesUseCaseSpy = new LoadDeliveriesUseCaseSpy()
  const sut = new LoadDeliveriesController(loadDeliveriesUseCaseSpy)

  return { sut, loadDeliveriesUseCaseSpy }
}

describe('LoadDeliveriesController', () => {
  test('should return defined when sut.init', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  test('should return a missing error if identificationIds param is not provided', async () => {
    const { sut } = makeSut()

    const response = await sut.handle(null)

    expect(response).toEqual({
      data: new MissingParamError('identificationIds'),
      type: 'failed',
    })
  })

  test('should return a list of deliveries if identificationIds param is provided', async () => {
    const { sut, loadDeliveriesUseCaseSpy } = makeSut()
    loadDeliveriesUseCaseSpy.output = mockReturnedArray(2, makeDeliveryFake())

    const response = await sut.handle({
      params: { identificationIds: ['any_id'] },
    })

    expect(response).toEqual({
      data: loadDeliveriesUseCaseSpy.output,
      type: 'success',
    })
  })

  test('should return a empty list if identificationIds param is provided', async () => {
    const { sut, loadDeliveriesUseCaseSpy } = makeSut()
    loadDeliveriesUseCaseSpy.output = []

    const response = await sut.handle({
      params: { identificationIds: ['any_id'] },
    })

    expect(response).toEqual({
      data: [],
      type: 'success',
    })
  })

  test('should valid if identificationIds param is provided for usecase and called one time', async () => {
    const { sut, loadDeliveriesUseCaseSpy } = makeSut()

    await sut.handle({
      params: { identificationIds: ['any_id'] },
    })

    expect(loadDeliveriesUseCaseSpy.identificationIds).toEqual(['any_id'])
    expect(loadDeliveriesUseCaseSpy.countCount).toBe(1)
  })

  test('should return a list of deliveries with a deliveryProofs prop', async () => {
    const { sut, loadDeliveriesUseCaseSpy } = makeSut()
    const deliveryFake = makeDeliveryFake()
    const deliveredWhen = new Date()
    const deliveryProofs = { deliveredWhen }
    loadDeliveriesUseCaseSpy.output = [{ ...deliveryFake, deliveryProofs }]

    const response = await sut.handle({
      params: { identificationIds: ['any_id'] },
    })

    expect(response).toEqual({
      data: [
        {
          ...deliveryFake,
          deliveryProofs: { deliveredWhen: deliveredWhen.toISOString() },
        },
      ],
      type: 'success',
    })
  })
})
