import { TypeormHelper } from '@/infra/db/helpers'
import { UpdateUserRepository } from './update-user-repository'
import { User } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

const makeSut = (): UpdateUserRepository => {
  return new UpdateUserRepository()
}

describe('UpdateUserRepository', () => {
  beforeAll(async () => {
    await TypeormHelper.connect()
    await getRepository(User).save({
      id: 1,
      name: 'any_name',
      password: 'any_password',
      email: 'any_email'
    })
  })

  afterEach(async () => {
    await TypeormHelper.clear('user')
  })

  afterAll(async () => {
    await TypeormHelper.disconnect()
  })

  test('Should update an user on sucess', async () => {
    const sut = makeSut()
    await sut.update(1, {
      name: 'updated_name',
      email: 'updated_email@gmail.com',
      accessToken: 'updated_token'
    })
    const user = await getRepository(User).findOne({ where: { id: 1 } })
    expect(user).toBeTruthy()
    expect(user?.id).toBe(1)
    expect(user?.name).toBe('updated_name')
    expect(user?.email).toBe('updated_email@gmail.com')
    expect(user?.accessToken).toBe('updated_token')
  })
})
