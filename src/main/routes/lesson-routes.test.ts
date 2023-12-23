import request from 'supertest'
import app from '../config/app'
import { TypeormHelper } from '@/infra/db/helpers/typeorm-helper'
import { getRepository } from 'typeorm'

describe('Lesson Routes', () => {
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

  describe('POST /lesson', () => {
    test('Should return 204 on sucess', async () => {
      await getRepository('course').save({
        id: 1,
        name: 'any_name',
        description: 'any_description',
        author: 'any_author',
        thumb: 'any_thumb'
      })
      await request(app).post('/api/lesson')
        .send({
          courseId: 1,
          name: 'any_name',
          description: 'any_description',
          urlVideo: 'any_url_video'
        })
        .expect(204)
    })
  })

  describe('PUT /lesson', () => {
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
      await request(app).put('/api/lesson/1')
        .send({
          courseId: 1,
          name: 'updated_name',
          description: 'updated_description',
          urlVideo: 'updated_url_video'
        })
        .expect(204)
    })
  })

  describe('GET /lesson/by-course', () => {
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
      await request(app).get('/api/lesson/by-course/1?skip=1&take=1')
        .expect(200)
    })
  })

  describe('DELETE /lesson', () => {
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
      await request(app).delete('/api/lesson/1')
        .expect(204)
    })
  })
})
