export type Delivery = {
  _id: string
  document: string
  destination: Person
  deliveryProofs?: Proof
  owner: string
}

type Person = {
  state: string
  city: string
  name: string
}

type Proof = {
  deliveredWhen: Date
  note: string
  images: [string]
}
