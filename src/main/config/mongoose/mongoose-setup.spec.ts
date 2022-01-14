import { setupMongoose } from '@/main/config/mongoose/mongoose-setup'

describe('MongooseSetup', () => {
  test('should throw if connection failure', () => {
    const promise = setupMongoose('')

    expect(promise).rejects.toThrow()
  })
})
