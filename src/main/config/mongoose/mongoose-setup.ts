import mongoose from 'mongoose'

export const setupMongoose = async (mongoURL: string) => {
  await mongoose.connect(mongoURL)
}
