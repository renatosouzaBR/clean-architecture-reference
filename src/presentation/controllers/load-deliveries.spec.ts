class LoadDeliveriesController {}

const makeSut = () => {
  const sut = new LoadDeliveriesController()

  return { sut }
}

describe('LoadDeliveriesController', () => {
  test('should return defined when sut.init', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })
})
