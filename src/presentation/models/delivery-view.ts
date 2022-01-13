import { Delivery } from '@/domain/entities/delivery'

export class DeliveryView {
  id: string
  document: string
  destination: Person
  deliveryProofs?: Proof
  owner: string

  static map(entity: Delivery): DeliveryView {
    if (entity.deliveryProofs) {
      return {
        ...entity,
        deliveryProofs: {
          ...entity.deliveryProofs,
          deliveredWhen: entity.deliveryProofs.deliveredWhen.toISOString(),
        },
      }
    }

    return {
      ...entity,
      deliveryProofs: undefined,
    }
  }

  static mapCollection(entities: Delivery[]): DeliveryView[] {
    return entities.map((entity) => DeliveryView.map(entity))
  }
}

class Person {
  state: string
  city: string
  name: string
}

class Proof {
  deliveredWhen: string
  note: string
  images: [string]
}
