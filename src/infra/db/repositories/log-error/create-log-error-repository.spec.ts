import { getRepository } from 'typeorm'
import { TypeormHelper } from '@/infra/db/helpers'
import { CreateLogErrorRepository } from './create-log-error-repository'

const makeSut = (): CreateLogErrorRepository => {
  return new CreateLogErrorRepository()
}

describe('CreateLogErrorRepository', () => {
  beforeAll(async () => {
    await TypeormHelper.connect()
    await TypeormHelper.clear('log_error')
  })

  afterEach(async () => {
    await TypeormHelper.clear('log_error')
  })

  afterAll(async () => {
    await TypeormHelper.disconnect()
  })

  test('Should create an error log on sucess', async () => {
    const sut = makeSut()
    await sut.create('any_error')
    const count = await getRepository('log_error').count()
    expect(count).toBe(1)
  })
})
