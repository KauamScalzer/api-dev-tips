import { TypeormHelper } from '@/infra/db/helpers'
import { UpdateLessonRepository } from './update-lesson-repository'
import { getRepository } from 'typeorm'
import { Course, Lesson } from '../../typeorm/models'

const makeSut = (): UpdateLessonRepository => {
  return new UpdateLessonRepository()
}

describe('UpdateLessonRepository', () => {
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

  test('Should update an lesson on sucess', async () => {
    await getRepository(Course).save({
      id: 1,
      name: 'any_name',
      description: 'any_description',
      author: 'any_author',
      thumb: 'any_thumb'
    })
    await getRepository(Lesson).save({
      id: 1,
      courseId: 1,
      name: 'any_name',
      description: 'any_description',
      urlVideo: 'any_url_video'
    })
    const sut = makeSut()
    await sut.update(1, {
      courseId: 1,
      name: 'updated_name',
      description: 'updated_description',
      urlVideo: 'updated_url_video'
    })
    const lesson: Lesson = await getRepository(Lesson).findOne({ where: { id: 1 } })
    expect(lesson.name).toBe('updated_name')
    expect(lesson.description).toBe('updated_description')
    expect(lesson.urlVideo).toBe('updated_url_video')
    expect(lesson.courseId).toBe(1)
  })
})
