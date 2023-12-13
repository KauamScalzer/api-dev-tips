import request from 'supertest'
import app from '../config/app'
import { TypeormHelper } from '@/infra/db/helpers/typeorm-helper'
import { getRepository } from 'typeorm'

describe('UserCourse Routes', () => {
  beforeAll(async () => {
    await TypeormHelper.connect()
  })

  afterEach(async () => {
    await TypeormHelper.clear('user_course')
    await TypeormHelper.clear('course')
    await TypeormHelper.clear('user')
  })

  afterAll(async () => {
    await TypeormHelper.disconnect()
  })

  describe('POST /user-course', () => {
    test('Should return 204 on sucess', async () => {
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
        email: 'any_email',
        urlImage: 'any_url_image'
      })
      await request(app).post('/api/user-course')
        .send({
          userId: 1,
          courseIds: [
            {
              id: 1
            }
          ]
        })
        .expect(204)
    })
  })
})
