import faker from 'faker'

export const mockMongoDeliveries = (arrayLength = 5) => {
  const deliveriesMock = []

  for (let i = 0; i < arrayLength; i++) {
    deliveriesMock.push(newDeliveryFake())
  }

  return deliveriesMock
}

const newDeliveryFake = () => ({
  _id: faker.datatype.uuid(),
  document: faker.datatype.number().toString(),
  destination: {
    name: faker.name.findName(),
    city: faker.address.city(),
    state: faker.address.state(),
  },
  owner: 'any_ids',
})
