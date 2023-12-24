import { HttpResponse } from '@/presentation/protocols'

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error
})
