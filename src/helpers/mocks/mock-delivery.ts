import faker from 'faker'

export const makeDeliveryFake = () => ({
  document: faker.datatype.number().toString(),
  destination: {
    name: faker.name.findName(),
    city: faker.address.city(),
    state: faker.address.state(),
  },
  owner: 'any_ids',
})
