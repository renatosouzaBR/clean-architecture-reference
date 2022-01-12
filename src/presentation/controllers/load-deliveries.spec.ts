import { MissingParamError } from '@/helpers/errors/missing-param-error'
import { Controller, Request, Response } from '@/infra/contracts/controller'

class LoadDeliveriesController implements Controller {
  handle(request: Request): Response {
    try {
      if (!request?.params?.identificationsIds)
        throw new MissingParamError('identificationsIds')

      return { data: [], type: 'success' }
    } catch (error) {
      return { data: error, type: 'failed' }
    }
  }
}

const makeSut = () => {
  const sut = new LoadDeliveriesController()

  return { sut }
}

describe('LoadDeliveriesController', () => {
  test('should return defined when sut.init', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  test('should return a missing error if identificationsIds param is not provided', () => {
    const { sut } = makeSut()

    const response = sut.handle(null)

    expect(response).toEqual({
      data: new MissingParamError('identificationsIds'),
      type: 'failed',
    })
  })
})
