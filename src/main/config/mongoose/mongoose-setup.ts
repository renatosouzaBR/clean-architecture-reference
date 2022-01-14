import mongoose from 'mongoose'

export const setupMongoose = async (mongoURL: string) => {
  return await mongoose.connect(mongoURL)
}
