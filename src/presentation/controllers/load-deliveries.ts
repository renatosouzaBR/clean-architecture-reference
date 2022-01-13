import { LoadDeliveries } from '@/domain/usecases/load-deliveries'
import { MissingParamError } from '@/helpers/errors/missing-param-error'
import {
  Controller,
  Request,
  Response,
} from '@/presentation/contracts/controller'
import { LoadDeliveriesParams } from '../contracts/load-deliveries-params'
import { DeliveryView } from '../models/delivery-view'

export class LoadDeliveriesController implements Controller {
  constructor(private readonly loadDeliveriesUseCase: LoadDeliveries) {}

  async handle(
    request: Request<LoadDeliveriesParams>
  ): Promise<Response<DeliveryView[]>> {
    try {
      if (!request?.params?.identificationIds)
        throw new MissingParamError('identificationIds')

      const { identificationIds } = request.params
      const deliveryList = await this.loadDeliveriesUseCase.load(
        identificationIds
      )

      return { data: DeliveryView.mapCollection(deliveryList), type: 'success' }
    } catch (error) {
      return { data: error, type: 'failed' }
    }
  }
}
