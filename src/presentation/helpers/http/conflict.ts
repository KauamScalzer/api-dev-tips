import { HttpResponse } from '@/presentation/protocols'

export const conflict = (error: Error): HttpResponse => ({
  statusCode: 409,
  body: error
})
