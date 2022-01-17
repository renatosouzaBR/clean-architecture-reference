import request from 'supertest'
import mongoose from 'mongoose'

import { setupMongoose } from '@/main/config/mongoose/mongoose-setup'
import { DeliveryModel } from '@/infra/repositories/mongo/delivery-schema'
import { mockReturnedArray } from '@/helpers/mocks/mock-returned-array'
import { makeDeliveryFake } from '@/helpers/mocks/mock-delivery'
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
    const ownerId = new mongoose.Types.ObjectId().toString()

    const response = await request(app)
      .get('/deliveries')
      .query({ identificationIds: [ownerId] })
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body).toEqual({ data: [], type: 'success' })
  })

  test('should return a list of deliveries', async () => {
    const ownerId = new mongoose.Types.ObjectId().toString()
    const deliveries = mockReturnedArray(2, {
      ...makeDeliveryFake(),
      owner: ownerId,
    })
    await DeliveryModel.insertMany(deliveries)

    const response = await request(app)
      .get('/deliveries')
      .query({ identificationIds: [ownerId] })
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body.data.length).toBe(2)
    expect(response.body.data.map((item) => item.document)).toEqual(
      deliveries.map((item) => item.document)
    )
    expect(response.body.type).toBe('success')
  })
})
