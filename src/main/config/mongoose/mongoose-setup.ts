import mongoose from 'mongoose'

import { MissingParamError } from '@/helpers/errors/missing-param-error'

export const setupMongoose = async (mongoURL: string) => {
  if (mongoURL) {
    if (mongoose.connection.readyState === 0) await mongoose.connect(mongoURL)
  } else {
    throw new MissingParamError('mongoURL')
  }
}
