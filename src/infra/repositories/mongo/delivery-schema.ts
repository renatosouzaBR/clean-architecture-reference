import mongoose from 'mongoose'

type Delivery = {
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

const Person = new mongoose.Schema({
  state: String,
  city: String,
  name: String,
})

const Proof = new mongoose.Schema({
  deliveredWhen: Date,
  note: String,
  images: [String],
})

const DeliverySchema = new mongoose.Schema({
  document: String,
  owner: String,
  destination: Person,
  deliveryProofs: Proof,
})

export const DeliveryModel = mongoose.model<Delivery>(
  'Delivery',
  DeliverySchema
)
