import { getRepository } from 'typeorm'
import { TypeormHelper } from '@/infra/db/helpers'
import { GetAllLessonByCourseRepository } from './get-all-lesson-by-course-repository'

const makeSut = (): GetAllLessonByCourseRepository => {
  return new GetAllLessonByCourseRepository()
}

describe('GetAllLessonByCourseRepository', () => {
  beforeAll(async () => {
    await TypeormHelper.connect()
  })

  afterEach(async () => {
    await TypeormHelper.clear('lesson')
    await TypeormHelper.clear('course')
  })

  afterAll(async () => {
    await TypeormHelper.disconnect()
  })

  test('Should get a lesson on sucess', async () => {
    await getRepository('course').save({
      id: 1,
      name: 'any_name',
      description: 'any_description',
      author: 'any_author',
      thumb: 'any_thumb'
    })
    await getRepository('lesson').save({
      id: 1,
      courseId: 1,
      name: 'any_name',
      description: 'any_description',
      urlVideo: 'any_url_video'
    })
    const sut = makeSut()
    const result = await sut.getAll({
      courseId: 1,
      skip: 0,
      take: 1
    })
    expect(result).toBeTruthy()
    expect(result.count).toBe(1)
    expect(result.result).toBeTruthy()
    expect(result.result[0].id).toBeTruthy()
    expect(result.result[0].courseId).toBe(1)
    expect(result.result[0].description).toBe('any_description')
    expect(result.result[0].urlVideo).toBe('any_url_video')
  })
})
