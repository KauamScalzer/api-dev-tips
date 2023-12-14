import { TypeormHelper } from '@/infra/db/helpers'
import { GetAllUserCourseByUserRepository } from './get-all-user-course-by-user-repository'
import { getRepository } from 'typeorm'

const makeSut = (): GetAllUserCourseByUserRepository => {
  return new GetAllUserCourseByUserRepository()
}

describe('GetAllUserCourseByUserRepository', () => {
  beforeAll(async () => {
    await TypeormHelper.connect()
  })

  afterEach(async () => {
    await TypeormHelper.clear('user_course')
  })

  afterAll(async () => {
    await TypeormHelper.disconnect()
  })

  test('Should return an user course on sucess', async () => {
    const sut = makeSut()
    await getRepository('course').save({
      id: 1,
      name: 'any_name',
      description: 'any_description',
      author: 'any_author',
      thumb: 'any_thumb'
    })
    await getRepository('user').save({
      id: 1,
      name: 'any_name',
      password: 'any_password',
      email: 'any_email',
      urlImage: 'any_url_image'
    })
    await getRepository('user_course').save({
      id: 1,
      userId: 1,
      courseId: 1
    })
    const result = await sut.getAll({
      userId: 1,
      skip: 0,
      take: 1
    })
    expect(result).toBeTruthy()
    expect(result.count).toBe(1)
    expect(result.data).toBeTruthy()
    expect(result.data[0].id).toBeTruthy()
    expect(result.data[0].userId).toBe(1)
    expect(result.data[0].courseId).toBe(1)
  })

  test('Should return [] if get all fails', async () => {
    const sut = makeSut()
    const user = await sut.getAll({
      userId: 1,
      skip: 0,
      take: 1
    })
    expect(user).toEqual({
      count: 0,
      data: []
    })
  })
})
