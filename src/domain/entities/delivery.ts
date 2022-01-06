export type Delivery = {
  document: string
  destination: Person
  deliveryProofs: Proof
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
