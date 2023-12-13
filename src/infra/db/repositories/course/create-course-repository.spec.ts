import { getRepository } from 'typeorm'
import { TypeormHelper } from '@/infra/db/helpers'
import { CreateCourseRepository } from './create-course-repository'

const makeSut = (): CreateCourseRepository => {
  return new CreateCourseRepository()
}

describe('CreateCourseRepository', () => {
  beforeAll(async () => {
    await TypeormHelper.connect()
  })

  afterEach(async () => {
    await TypeormHelper.clear('course')
  })

  afterAll(async () => {
    await TypeormHelper.disconnect()
  })

  test('Should create a course on sucess', async () => {
    const sut = makeSut()
    await sut.create({
      name: 'any_name',
      description: 'any_description',
      author: 'any_author',
      thumb: 'any_thumb'
    })
    const count = await getRepository('course').count()
    expect(count).toBe(1)
  })
})
