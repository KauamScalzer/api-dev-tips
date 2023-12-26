import { HttpResponse } from '@/presentation/protocols'

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})
