import mongoose from 'mongoose'

export const setupMongoose = async (mongoURL: string) => {
  if (mongoose.connection.readyState === 0) await mongoose.connect(mongoURL)
}
