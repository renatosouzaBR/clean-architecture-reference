import { Delivery } from '@/domain/entities/delivery'
import { LoadDeliveries } from '@/domain/usecases/load-deliveries'
import { MissingParamError } from '@/helpers/errors/missing-param-error'
import { makeDeliveryFake } from '@/helpers/mocks/mock-delivery'
import { mockReturnedArray } from '@/helpers/mocks/mock-returned-array'
import { Controller, Request, Response } from '@/infra/contracts/controller'

class LoadDeliveriesController implements Controller {
  constructor(private readonly loadDeliveriesUseCase: LoadDeliveries) {}

  async handle(request: Request): Promise<Response> {
    try {
      if (!request?.params?.identificationsIds)
        throw new MissingParamError('identificationsIds')

      const { identificationsIds } = request.params
      const deliveryList = await this.loadDeliveriesUseCase.load(
        identificationsIds
      )

      return { data: deliveryList, type: 'success' }
    } catch (error) {
      return { data: error, type: 'failed' }
    }
  }
}

class LoadDeliveriesUseCaseMock implements LoadDeliveries {
  output = []
  load(identificationIds: string[]): Promise<Delivery[]> {
    return Promise.resolve(this.output)
  }
}

const makeSut = () => {
  const loadDeliveriesUseCaseMock = new LoadDeliveriesUseCaseMock()
  const sut = new LoadDeliveriesController(loadDeliveriesUseCaseMock)

  return { sut, loadDeliveriesUseCaseMock }
}

describe('LoadDeliveriesController', () => {
  test('should return defined when sut.init', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  test('should return a missing error if identificationsIds param is not provided', async () => {
    const { sut } = makeSut()

    const response = await sut.handle(null)

    expect(response).toEqual({
      data: new MissingParamError('identificationsIds'),
      type: 'failed',
    })
  })

  test('should return a list of deliveries if identificationsIds param is provided', async () => {
    const { sut, loadDeliveriesUseCaseMock } = makeSut()
    loadDeliveriesUseCaseMock.output = mockReturnedArray(2, makeDeliveryFake())

    const response = await sut.handle({
      params: { identificationsIds: ['any_id'] },
    })

    expect(response).toEqual({
      data: loadDeliveriesUseCaseMock.output,
      type: 'success',
    })
  })

  test('should return a empty list if identificationsIds param is provided', async () => {
    const { sut, loadDeliveriesUseCaseMock } = makeSut()
    loadDeliveriesUseCaseMock.output = []

    const response = await sut.handle({
      params: { identificationsIds: ['any_id'] },
    })

    expect(response).toEqual({
      data: [],
      type: 'success',
    })
  })
})
