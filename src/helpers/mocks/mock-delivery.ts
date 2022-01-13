import faker from 'faker'

export const makeDeliveryFake = () => ({
  id: faker.datatype.uuid(),
  document: faker.datatype.number().toString(),
  destination: {
    name: faker.name.findName(),
    city: faker.address.city(),
    state: faker.address.state(),
  },
  owner: 'any_ids',
})
