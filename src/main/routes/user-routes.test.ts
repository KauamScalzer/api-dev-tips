import request from 'supertest'
import app from '../config/app'
import { TypeormHelper } from '@/infra/db/helpers/typeorm-helper'
import { getRepository } from 'typeorm'
import { hash } from 'bcrypt'

describe('User Routes', () => {
  beforeAll(async () => {
    await TypeormHelper.connect()
  })

  afterEach(async () => {
    await TypeormHelper.clear('user')
  })

  afterAll(async () => {
    await TypeormHelper.disconnect()
  })

  describe('POST /user', () => {
    test('Should return 201 on sucess', async () => {
      await request(app).post('/api/user')
        .send({
          name: 'Kauam',
          email: 'kauam@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(201)
    })
  })

  describe('POST /user/authentication', () => {
    test('Should return 200 on sucess', async () => {
      const password = await hash('123', 12)
      await getRepository('user').save({
        name: 'kauam',
        password,
        email: 'kauam@gmail.com'
      })
      await request(app).post('/api/user/authentication')
        .send({
          email: 'kauam@gmail.com',
          password: '123'
        })
        .expect(200)
    })

    test('Should return 401 on authentication', async () => {
      await request(app).post('/api/user/authentication')
        .send({
          email: 'kauam@gmail.com',
          password: '123'
        })
        .expect(401)
    })
  })

  describe('PUT /user', () => {
    test('Should return 204 on sucess', async () => {
      await getRepository('user').save({
        id: 1,
        name: 'kauam',
        password: 'any_password',
        email: 'kauam@gmail.com'
      })
      await request(app).put('/api/user/1')
        .send({
          name: 'updated_name',
          email: 'updated_email@gmail.com'
        })
        .expect(204)
    })
  })

  describe('DELETE /user', () => {
    test('Should return 204 on sucess', async () => {
      await getRepository('user').save({
        id: 1,
        name: 'kauam',
        password: 'any_password',
        email: 'kauam@gmail.com'
      })
      await request(app).delete('/api/user/1')
        .expect(204)
    })
  })

  describe('GET /user', () => {
    test('Should return 200 on sucess', async () => {
      await getRepository('user').save({
        id: 1,
        name: 'kauam',
        password: 'any_password',
        email: 'kauam@gmail.com'
      })
      await request(app).get('/api/user/1')
        .expect(200)
    })
  })
})
