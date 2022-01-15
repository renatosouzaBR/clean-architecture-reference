import mongoose from 'mongoose'

import { setupMongoose } from '@/main/config/mongoose/mongoose-setup'
import { MissingParamError } from '@/helpers/errors/missing-param-error'
import env from '@/main/config/env'

describe('MongooseSetup', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('should throw if mongoURL param is not provided', async () => {
    const promise = setupMongoose(null)

    await expect(promise).rejects.toThrow(new MissingParamError('mongoURL'))
  })

  test('should pass if mongoURL param is provided', async () => {
    mongoose.connect = jest.fn()

    await setupMongoose(env.database.url)

    expect(mongoose.connect).toHaveBeenCalledWith(env.database.url)
  })

  test('should not call mongoose.connect if connection.readyState != 0', async () => {
    mongoose.connection.readyState = 1

    await setupMongoose(env.database.url)

    expect(mongoose.connect).not.toHaveBeenCalled()
  })
})
