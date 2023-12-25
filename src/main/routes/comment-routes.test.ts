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

  describe('GET /comment', () => {
    test('Should return 200 on sucess', async () => {
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
      await request(app).get('/api/comment/1?skip=1&take=1')
        .expect(200)
    })
  })

  describe('DELETE /comment', () => {
    test('Should return 200 on sucess', async () => {
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
      await request(app).delete('/api/comment/1')
        .expect(204)
    })
  })

  describe('PUT /comment', () => {
    test('Should return 200 on sucess', async () => {
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
      await request(app).put('/api/comment/1')
        .send({
          comment: 'updated_comment'
        })
        .expect(204)
    })
  })
})
