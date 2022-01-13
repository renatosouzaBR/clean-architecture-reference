export interface Controller {
  handle(request: Request): Promise<Response>
}

export type Request<T = any> = {
  params: T
}

export type Response<T = any> = {
  data: T
  type: 'success' | 'failed'
}
