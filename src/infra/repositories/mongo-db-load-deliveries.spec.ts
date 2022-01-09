class MongoDBLoadDeliveries {}

describe('MongoDBLoadDeliveries', () => {
  test('should call sut.init sucessfully', () => {
    const mongoDBLoadDeliveries = new MongoDBLoadDeliveries()

    expect(mongoDBLoadDeliveries).toBeDefined()
  })
})
