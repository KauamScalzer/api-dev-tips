import { TypeormHelper } from '@/infra/db/helpers'
import { GetOneUserRepository } from './get-one-user-repository'
import { getRepository } from 'typeorm'

const makeSut = (): GetOneUserRepository => {
  return new GetOneUserRepository()
}

describe('GetOneUserRepository', () => {
  beforeAll(async () => {
    await TypeormHelper.connect()
  })

  afterEach(async () => {
    await TypeormHelper.clear('user')
  })

  afterAll(async () => {
    await TypeormHelper.disconnect()
  })

  test('Should return an user on sucess', async () => {
    const sut = makeSut()
    await getRepository('user').save({
      id: 1,
      name: 'any_name',
      password: 'any_password',
      email: 'any_email'
    })
    const user = await sut.getOne(1)
    expect(user).toBeTruthy()
    expect(user?.id).toBe(1)
    expect(user?.name).toBe('any_name')
    expect(user?.email).toBe('any_email')
  })

  test('Should return null if get one fails', async () => {
    const sut = makeSut()
    const user = await sut.getOne(1)
    expect(user).toBeFalsy()
  })
})
