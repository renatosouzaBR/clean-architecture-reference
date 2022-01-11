import { Delivery } from '@/domain/entities/delivery'

export interface DbLoadDeliveriesRepository {
  load(identificationIds: string[]): Promise<Delivery[]>
}
