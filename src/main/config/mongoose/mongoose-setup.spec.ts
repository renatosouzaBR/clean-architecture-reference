import { setupMongoose } from '@/main/config/mongoose/mongoose-setup'
import env from '@/main/config/env'

describe('MongooseSetup', () => {
  test('should throw if connection failure', () => {
    const promise = setupMongoose('')

    expect(promise).rejects.toThrow()
  })

  test('should valid if success connetion is true', async () => {
    const mongoConnection = await setupMongoose(env.database.url)

    expect(mongoConnection.connection.readyState).toBe(1)
  })
})
