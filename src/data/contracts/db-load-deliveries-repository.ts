import { DeliveryData } from '@/data/models/delivery-data'

export interface DbLoadDeliveriesRepository {
  load(identificationIds: string[]): Promise<DeliveryData[]>
}
