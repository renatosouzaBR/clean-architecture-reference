export class OutputError extends Error {
  constructor(message: string) {
    super('OutputError')
    this.message = message
  }
}
