import { TypeormHelper } from '@/infra/db/helpers'
import { GetOneUserByEmailRepository } from './get-one-user-by-email-repository'
import { getRepository } from 'typeorm'

const makeSut = (): GetOneUserByEmailRepository => {
  return new GetOneUserByEmailRepository()
}

describe('GetOneUserByEmailRepository Repository', () => {
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
      email: 'any_email',
      urlImage: 'any_url_image'
    })
    const user = await sut.getOne('any_email')
    expect(user).toBeTruthy()
    expect(user?.id).toBe(1)
    expect(user?.name).toBe('any_name')
    expect(user?.email).toBe('any_email')
    expect(user?.password).toBe('any_password')
    expect(user?.urlImage).toBe('any_url_image')
  })

  test('Should return null if get one fails', async () => {
    const sut = makeSut()
    const user = await sut.getOne('any_email')
    expect(user).toBeFalsy()
  })
})
