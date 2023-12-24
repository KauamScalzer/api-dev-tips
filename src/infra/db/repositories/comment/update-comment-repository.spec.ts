import { getRepository } from 'typeorm'
import { TypeormHelper } from '@/infra/db/helpers'
import { UpdateCommentRepository } from './update-comment-repository'
import { Comment } from '../../typeorm/models'

const makeSut = (): UpdateCommentRepository => {
  return new UpdateCommentRepository()
}

describe('UpdateCommentRepository', () => {
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
      password: 'any_password',
      urlImage: 'any_url_image'
    })
    await getRepository('comment').save({
      id: 1,
      lessonId: 1,
      userId: 1,
      comment: 'any_comment'
    })
    const sut = makeSut()
    await sut.update({
      id: 1,
      comment: 'updated_comment'
    })
    const comment: Comment = await getRepository(Comment).findOne({ where: { id: 1 } })
    expect(comment.comment).toBe('updated_comment')
  })
})
