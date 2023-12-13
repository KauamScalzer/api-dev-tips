import { getRepository } from 'typeorm'
import { TypeormHelper } from '@/infra/db/helpers'
import { CreateUserCourseRepository } from './create-user-course-repository'

const makeSut = (): CreateUserCourseRepository => {
  return new CreateUserCourseRepository()
}

describe('CreateUserCourseRepository', () => {
  beforeAll(async () => {
    await TypeormHelper.connect()
  })

  afterEach(async () => {
    await TypeormHelper.clear('user_course')
    await TypeormHelper.clear('course')
    await TypeormHelper.clear('user')
  })

  afterAll(async () => {
    await TypeormHelper.disconnect()
  })

  test('Should create a user course on sucess', async () => {
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
    const sut = makeSut()
    await sut.create({
      userId: 1,
      courseId: 1
    })
    const count = await getRepository('user_course').count()
    expect(count).toBe(1)
  })
})
