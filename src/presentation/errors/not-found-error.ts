export class NotFoundError extends Error {
  constructor (field: string) {
    super(`The received ${field} was not found`)
    this.name = 'NotFoundError'
  }
}
