import { getRepository } from 'typeorm'
import { TypeormHelper } from '@/infra/db/helpers'
import { GetAllCommentsByLessonRepository } from './get-all-comments-by-lesson-repository'

const makeSut = (): GetAllCommentsByLessonRepository => {
  return new GetAllCommentsByLessonRepository()
}

describe('GetAllCommentsByLessonRepository', () => {
  beforeAll(async () => {
    await TypeormHelper.connect()
  })

  afterEach(async () => {
    await TypeormHelper.clear('comment')
    await TypeormHelper.clear('lesson')
    await TypeormHelper.clear('course')
    await TypeormHelper.clear('user')
  })

  afterAll(async () => {
    await TypeormHelper.disconnect()
  })

  test('Should delete a comment on sucess', async () => {
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
    await getRepository('user').save({
      id: 1,
      name: 'any_name',
      email: 'any_email@gmail.com',
      password: 'any_password'
    })
    await getRepository('comment').save({
      id: 1,
      lessonId: 1,
      userId: 1,
      comment: 'any_comment'
    })
    const sut = makeSut()
    const result = await sut.getAll({
      lessonId: 1,
      take: 1,
      skip: 0
    })
    expect(result).toBeTruthy()
    expect(result.count).toBe(1)
    expect(result.result).toBeTruthy()
    expect(result.result[0].id).toBeTruthy()
    expect(result.result[0].userId).toBe(1)
    expect(result.result[0].lessonId).toBe(1)
    expect(result.result[0].comment).toBe('any_comment')
  })
})
