import { HttpResponse } from '@/presentation/protocols'
import { conflict } from './conflict'
import { badRequest } from './bad-request'

export const returnDecider = (error: Error): HttpResponse => {
  switch (error.name) {
    case 'InUseError':
      return conflict(error)
    case 'InvalidParamError':
    case 'MissingParamError':
      return badRequest(error)
    default:
      break
  }
}
