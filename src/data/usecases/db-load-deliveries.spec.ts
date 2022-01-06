class DbLoadDeliveries {}

describe('DBLoadDeliveries', () => {
  test('should return definied sut.init', () => {
    const dbLoadDeliveries = new DbLoadDeliveries()
    expect(dbLoadDeliveries).toBeDefined()
  })
})
