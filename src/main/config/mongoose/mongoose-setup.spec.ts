import mongoose from 'mongoose'

import { setupMongoose } from '@/main/config/mongoose/mongoose-setup'
import env from '@/main/config/env'

describe('MongooseSetup', () => {
  test('should throw if connection failure', async () => {
    const promise = setupMongoose('')

    await expect(promise).rejects.toThrow()
  })

  test('should valid if success connetion is true', async () => {
    await setupMongoose(env.database.url)

    expect(mongoose.connection.readyState).toBe(1)
  })

  test('should valid if mongodb url is provided', async () => {
    await setupMongoose(env.database.url)
    const { host, name } = mongoose.connection

    expect(`mongodb://${host}/${name}`).toEqual(env.database.url)
  })
})
