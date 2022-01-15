import { Request, Response } from 'express'

import { Controller } from '@/presentation/contracts/controller'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const response = await controller.handle({ params: req.query })

    if (response.type === 'success') {
      res.send(response)
    } else {
      res.status(404).send(response)
    }
  }
}
