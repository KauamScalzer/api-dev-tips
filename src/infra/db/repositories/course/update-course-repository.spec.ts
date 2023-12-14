import { TypeormHelper } from '@/infra/db/helpers'
import { UpdateCourseRepository } from './update-course-repository'
import { getRepository } from 'typeorm'
import { Course } from '../../typeorm/models'

const makeSut = (): UpdateCourseRepository => {
  return new UpdateCourseRepository()
}

describe('UpdateCourseRepository', () => {
  beforeAll(async () => {
    await TypeormHelper.connect()
  })

  afterEach(async () => {
    await TypeormHelper.clear('course')
  })

  afterAll(async () => {
    await TypeormHelper.disconnect()
  })

  test('Should update an course on sucess', async () => {
    const sut = makeSut()
    await getRepository(Course).save({
      id: 1,
      name: 'any_name',
      description: 'any_description',
      author: 'any_author',
      thumb: 'any_thumb'
    })
    await sut.update(1, {
      name: 'updated_name',
      description: 'updated_description',
      author: 'updated_author',
      thumb: 'updated_thumb'
    })
    const course: Course = await getRepository(Course).findOne({ where: { id: 1 } })
    expect(course.name).toBe('updated_name')
    expect(course.description).toBe('updated_description')
    expect(course.author).toBe('updated_author')
    expect(course.thumb).toBe('updated_thumb')
  })
})
