import request from 'supertest'
import mongoose from 'mongoose'

import { setupMongoose } from '@/main/config/mongoose/mongoose-setup'
import { DeliveryModel } from '@/infra/repositories/mongo/delivery-schema'
import env from '@/main/config/env'
import app from '@/main/express/app'

describe('LoadDeliveriesE2E', () => {
  beforeAll(async () => {
    await setupMongoose(env.database.url)
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  beforeEach(async () => {
    await DeliveryModel.deleteMany()
  })

  test('should return a empty list of deliveries', async () => {
    const mongoId = new mongoose.Types.ObjectId().toString()

    const response = await request(app)
      .get('/deliveries')
      .query({ identificationIds: [mongoId] })
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body).toEqual({ data: [], type: 'success' })
  })
})
