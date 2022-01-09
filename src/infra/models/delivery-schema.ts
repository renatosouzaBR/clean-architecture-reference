import mongoose from 'mongoose'

import { Delivery } from '@/infra/models/delivery'

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
