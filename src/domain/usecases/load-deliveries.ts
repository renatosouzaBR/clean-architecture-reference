import { Delivery } from '@/domain/entities/delivery'

export interface LoadDeliveries {
  load(identificationIds: string[]): Promise<Delivery[]>
}
