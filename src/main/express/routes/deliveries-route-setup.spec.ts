import express from 'express'
import request from 'supertest'

import { setupDeliveriesRoute } from '@/main/express/routes/deliveries-route-setup'
import { LoadDeliveriesController } from '@/presentation/controllers/load-deliveries'

describe('DeliveriesRouteSetup', () => {
  test('should return a json body', async () => {
    const app = express()
    setupDeliveriesRoute(app)
    jest
      .spyOn(LoadDeliveriesController.prototype, 'handle')
      .mockResolvedValue({ data: [], type: 'success' })

    await request(app)
      .get('/deliveries')
      .expect(200)
      .expect('Content-Type', /json/)
  })
})
