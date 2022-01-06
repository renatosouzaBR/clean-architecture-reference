export class OutputError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'OutputError'
  }
}
