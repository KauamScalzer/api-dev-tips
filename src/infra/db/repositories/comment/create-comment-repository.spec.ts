import { getRepository } from 'typeorm'
import { TypeormHelper } from '@/infra/db/helpers'
import { CreateCommentRepository } from './create-comment-repository'

const makeSut = (): CreateCommentRepository => {
  return new CreateCommentRepository()
}

describe('CreateCommentRepository', () => {
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

  test('Should create a comment on sucess', async () => {
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
    const sut = makeSut()
    await sut.create({
      lessonId: 1,
      userId: 1,
      comment: 'any_comment'
    })
    const count = await getRepository('comment').count()
    expect(count).toBe(1)
  })
})
