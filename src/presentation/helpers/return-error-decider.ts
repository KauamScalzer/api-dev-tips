import { HttpResponse } from '@/presentation/protocols'
import { conflict, badRequest, notFound } from './http-helpers'

export const returnErrorDecider = (error: Error): HttpResponse => {
  switch (error.name) {
    case 'InUseError':
      return conflict(error)
    case 'InvalidParamError':
    case 'MissingParamError':
      return badRequest(error)
    case 'NotFoundError':
      return notFound(error)
    default:
      break
  }
}
