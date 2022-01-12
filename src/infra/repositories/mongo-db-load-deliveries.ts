import { DbLoadDeliveriesRepository } from '@/data/contracts/db-load-deliveries-repository'
import { Delivery } from '@/domain/entities/delivery'
import { InputError } from '@/data/helpers/input-error'
import { DeliveryModel } from '@/infra/models/delivery-schema'

export class MongoDBLoadDeliveries implements DbLoadDeliveriesRepository {
  async load(identificationIds: string[]): Promise<Delivery[]> {
    if (!identificationIds || identificationIds.length <= 0)
      throw new InputError('identificationIds cannot be empty')

    const deliveryList = await DeliveryModel.find({ _id: identificationIds })

    return deliveryList.map((delivery) => ({
      id: delivery._id,
      ...delivery,
    }))
  }
}
