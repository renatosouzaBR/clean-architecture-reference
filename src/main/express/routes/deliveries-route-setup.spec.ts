import express from 'express'
import request from 'supertest'

import { setupDeliveriesRoute } from '@/main/express/routes/deliveries-route-setup'
import { LoadDeliveriesController } from '@/presentation/controllers/load-deliveries'
import { mockReturnedArray } from '@/helpers/mocks/mock-returned-array'
import { makeDeliveryFake } from '@/helpers/mocks/mock-delivery'

const makeSut = () => {
  const sut = express()
  setupDeliveriesRoute(sut)

  return { sut }
}

describe('DeliveriesRouteSetup', () => {
  test('should return a json body in get /deliveries', async () => {
    const { sut } = makeSut()
    jest
      .spyOn(LoadDeliveriesController.prototype, 'handle')
      .mockResolvedValue({ data: [], type: 'success' })

    await request(sut)
      .get('/deliveries')
      .expect(200)
      .expect('Content-Type', /json/)
  })

  test('should return a empty list of deliveries', async () => {
    const { sut } = makeSut()
    jest
      .spyOn(LoadDeliveriesController.prototype, 'handle')
      .mockResolvedValue({ data: [], type: 'success' })

    const response = await request(sut).get('/deliveries').expect(200)

    expect(response.body).toEqual({ data: [], type: 'success' })
  })

  test('should return a list of deliveries', async () => {
    const { sut } = makeSut()
    const deliveries = mockReturnedArray(4, makeDeliveryFake())
    jest
      .spyOn(LoadDeliveriesController.prototype, 'handle')
      .mockResolvedValue({ data: deliveries, type: 'success' })

    const response = await request(sut).get('/deliveries').expect(200)

    expect(response.body).toEqual({ data: deliveries, type: 'success' })
  })
})
