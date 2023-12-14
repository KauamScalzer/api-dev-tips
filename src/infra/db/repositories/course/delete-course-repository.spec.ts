import { getRepository } from 'typeorm'
import { TypeormHelper } from '@/infra/db/helpers'
import { DeleteCourseRepository } from './delete-course-repository'

const makeSut = (): DeleteCourseRepository => {
  return new DeleteCourseRepository()
}

describe('DeleteCourseRepository', () => {
  beforeAll(async () => {
    await TypeormHelper.connect()
  })

  afterEach(async () => {
    await TypeormHelper.clear('course')
  })

  afterAll(async () => {
    await TypeormHelper.disconnect()
  })

  test('Should delete a course on sucess', async () => {
    await getRepository('course').save({
      id: 1,
      name: 'any_name',
      description: 'any_description',
      author: 'any_author',
      thumb: 'any_thumb'
    })
    const sut = makeSut()
    await sut.delete(1)
    const count = await getRepository('course').count()
    expect(count).toBe(0)
  })
})
