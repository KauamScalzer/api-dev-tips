import request from 'supertest'
import app from '../config/app'
import { TypeormHelper } from '@/infra/db/helpers/typeorm-helper'
import { getRepository } from 'typeorm'

describe('Comment Routes', () => {
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

  describe('POST /comment', () => {
    test('Should return 204 on sucess', async () => {
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
      await request(app).post('/api/comment')
        .send({
          lessonId: 1,
          userId: 1,
          comment: 'any_comment'
        })
        .expect(204)
    })
  })
})
