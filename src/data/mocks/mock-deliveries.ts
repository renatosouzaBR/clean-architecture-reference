import faker from 'faker'

export const mockDeliveries = (arrayLength = 5) => {
  const deliveriesMock = []

  for (let i = 0; i < arrayLength; i++) {
    deliveriesMock.push({
      id: faker.datatype.uuid(),
      document: faker.datatype.number().toString(),
      destination: {
        name: faker.name.findName(),
        city: faker.address.city(),
        state: faker.address.state(),
      },
      owner: 'any_ids',
    })
  }

  return deliveriesMock
}
