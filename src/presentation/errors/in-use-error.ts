export class InUseError extends Error {
  constructor (field: string) {
    super(`The received ${field} is already in use`)
    this.name = 'InUseError'
  }
}
