import { Delivery } from '@/domain/entities/delivery'
import { LoadDeliveries } from '@/domain/usecases/load-deliveries'
import { InputError } from '@/data/helpers/input-error'
import { OutputError } from '@/data/helpers/output-error'
import { DbLoadDeliveriesRepository } from '@/data/contracts/db-load-deliveries-repository'

export class DbLoadDeliveries implements LoadDeliveries {
  constructor(
    private readonly dbLoadDeliveriesRepository: DbLoadDeliveriesRepository
  ) {}

  load(identificationIds: string[]): Delivery[] {
    if (identificationIds?.length <= 0)
      throw new InputError('identificationIds cannot be empty')

    const dbListDeliveries =
      this.dbLoadDeliveriesRepository.load(identificationIds)

    const hasUnknownIds = dbListDeliveries.filter(
      (delivery) => !identificationIds.includes(delivery.owner)
    )

    if (hasUnknownIds.length > 0)
      throw new OutputError('return with unknown ids')

    return dbListDeliveries
  }
}
