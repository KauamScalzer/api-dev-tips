import { TypeormHelper } from '@/infra/db/helpers'
import { DeleteUserRepository } from './delete-user-repository'
import { getRepository } from 'typeorm'

const makeSut = (): DeleteUserRepository => {
  return new DeleteUserRepository()
}

describe('DeleteUserRepository', () => {
  beforeAll(async () => {
    await TypeormHelper.connect()
  })

  afterEach(async () => {
    await TypeormHelper.clear('user')
  })

  afterAll(async () => {
    await TypeormHelper.disconnect()
  })

  test('Should delete an user on sucess', async () => {
    await getRepository('user').save({
      id: 1,
      name: 'any_name',
      password: 'any_password',
      email: 'any_email',
      urlImage: 'any_url_image'
    })
    const sut = makeSut()
    await sut.delete(1)
    const count = await getRepository('user').count()
    expect(count).toBe(0)
  })
})
