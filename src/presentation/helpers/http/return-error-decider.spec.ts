import { HttpResponse } from '@/presentation/protocols'
import { returnErrorDecider } from './return-error-decider'
import { InUseError, InvalidParamError, MissingParamError, NotFoundError } from '@/presentation/errors'

describe('returnErrorDecider', () => {
  test('Should return 409 if conflict error is provided', async () => {
    const error = new InUseError('InUseError')
    const result: HttpResponse = returnErrorDecider(error)
    expect(result.statusCode).toBe(409)
  })

  test('Should return 400 if invalid param error is provided', async () => {
    const error = new InvalidParamError('InvalidParamError')
    const result: HttpResponse = returnErrorDecider(error)
    expect(result.statusCode).toBe(400)
  })

  test('Should return 400 if missing param error is provided', async () => {
    const error = new MissingParamError('MissingParamError')
    const result: HttpResponse = returnErrorDecider(error)
    expect(result.statusCode).toBe(400)
  })

  test('Should return 404 if not found error is provided', async () => {
    const error = new NotFoundError('NotFoundError')
    const result: HttpResponse = returnErrorDecider(error)
    expect(result.statusCode).toBe(404)
  })
})
