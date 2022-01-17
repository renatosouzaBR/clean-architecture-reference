import { DeliveryData } from '@/data/models/delivery-data'
import { InputError } from '@/helpers/errors/input-error'
import { DbLoadDeliveriesRepository } from '@/data/contracts/db-load-deliveries-repository'
import { DeliveryModel } from '@/infra/repositories/mongo/delivery-schema'

export class MongoDBLoadDeliveries implements DbLoadDeliveriesRepository {
  async load(identificationIds: string[]): Promise<DeliveryData[]> {
    if (!identificationIds || identificationIds.length <= 0)
      throw new InputError('identificationIds cannot be empty')

    const deliveryList = await DeliveryModel.find({
      owner: identificationIds,
    })

    return deliveryList.map((delivery) => ({
      id: delivery._id,
      document: delivery.document,
      destination: delivery.destination,
      deliveryProofs: delivery.deliveryProofs,
      owner: delivery.owner,
    }))
  }
}
