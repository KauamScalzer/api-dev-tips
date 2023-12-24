import { getRepository } from 'typeorm'
import { TypeormHelper } from '@/infra/db/helpers'
import { DeleteLessonRepository } from './delete-lesson-repository'

const makeSut = (): DeleteLessonRepository => {
  return new DeleteLessonRepository()
}

describe('DeleteLessonRepository', () => {
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

  test('Should delete a lesson on sucess', async () => {
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
    await sut.delete(1)
    const count = await getRepository('lesson').count()
    expect(count).toBe(0)
  })
})
