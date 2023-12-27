import request from 'supertest'
import app from '../config/app'
import { TypeormHelper } from '@/infra/db/helpers/typeorm-helper'
import { getRepository } from 'typeorm'

describe('Course Routes', () => {
  beforeAll(async () => {
    await TypeormHelper.connect()
  })

  afterEach(async () => {
    await TypeormHelper.clear('course')
    await TypeormHelper.clear('user')
    await TypeormHelper.clear('user_course')
  })

  afterAll(async () => {
    await TypeormHelper.disconnect()
  })

  describe('POST /course', () => {
    test('Should return 201 on sucess', async () => {
      await request(app).post('/api/course')
        .send({
          name: 'any_name',
          description: 'any_description',
          author: 'any_author',
          thumb: 'any_thumb'
        })
        .expect(201)
    })
  })

  describe('GET /course', () => {
    test('Should return 200 on sucess', async () => {
      await getRepository('course').save({
        name: 'any_name',
        description: 'any_description',
        author: 'any_author',
        thumb: 'any_thumb'
      })
      await request(app).get('/api/course?take=10&skip=1')
        .expect(200)
    })
  })

  describe('PUT /course', () => {
    test('Should return 204 on sucess', async () => {
      await getRepository('course').save({
        id: 1,
        name: 'any_name',
        description: 'any_description',
        author: 'any_author',
        thumb: 'any_thumb'
      })
      await request(app).put('/api/course/1')
        .send({
          name: 'updated_name',
          description: 'updated_description',
          author: 'updated_author',
          thumb: 'updated_thumb'
        })
        .expect(204)
    })
  })

  describe('DELETE /course', () => {
    test('Should return 204 on sucess', async () => {
      await getRepository('course').save({
        id: 1,
        name: 'any_name',
        description: 'any_description',
        author: 'any_author',
        thumb: 'any_thumb'
      })
      await request(app).delete('/api/course/1')
        .expect(204)
    })
  })

  describe('GET /course/by-user', () => {
    test('Should return 200 on sucess', async () => {
      await getRepository('course').save({
        id: 1,
        name: 'any_name',
        description: 'any_description',
        author: 'any_author',
        thumb: 'any_thumb'
      })
      await getRepository('user').save({
        id: 1,
        name: 'any_name',
        password: 'any_password',
        email: 'any_email'
      })
      await getRepository('user_course').save({
        id: 1,
        userId: 1,
        courseId: 1
      })
      await request(app).get('/api/course/by-user/1?take=5&skip=1')
        .expect(200)
    })
  })
})
