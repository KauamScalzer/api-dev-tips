import { getRepository } from 'typeorm'
import { TypeormHelper } from '@/infra/db/helpers'
import { CreateLessonRepository } from './create-lesson-repository'

const makeSut = (): CreateLessonRepository => {
  return new CreateLessonRepository()
}

describe('CreateLessonRepository', () => {
  beforeAll(async () => {
    await TypeormHelper.connect()
  })

  afterEach(async () => {
    await TypeormHelper.clear('lesson')
    await TypeormHelper.clear('course')
  })

  afterAll(async () => {
    await TypeormHelper.desconnect()
  })

  test('Should create a lesson on sucess', async () => {
    await getRepository('course').save({
      id: 1,
      name: 'any_name',
      description: 'any_description',
      author: 'any_author',
      thumb: 'any_thumb'
    })
    const sut = makeSut()
    await sut.create({
      courseId: 1,
      name: 'any_name',
      description: 'any_description',
      urlVideo: 'any_urll_video'
    })
    const count = await getRepository('lesson').count()
    expect(count).toBe(1)
  })
})
