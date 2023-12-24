import { HttpResponse } from '@/presentation/protocols'
import { conflict } from './conflict'
import { badRequest } from './bad-request'
import { notFound } from './not-found'

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
