export interface Controller {
  handle(request: Request): Response
}

export type Request = {
  params: any
}

export type Response = {
  data: any
  type: 'success' | 'failed'
}
