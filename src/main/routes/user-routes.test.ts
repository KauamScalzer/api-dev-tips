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
    await TypeormHelper.desconnect()
  })

  describe('POST /user', () => {
    test('Should return 200 on sucess', async () => {
      await request(app).post('/api/user')
        .send({
          name: 'Kauam',
          email: 'kauam@gmail.com',
          password: '123',
          passwordConfirmation: '123',
          urlImage: 'https://sm.ign.com/ign_br/screenshot/default/avatar-3-jake-sully-out-as-narrator-replaced-by-son-loak-q8g_qny6.jpg'
        })
        .expect(200)
    })
  })

  describe('POST /user/authentication', () => {
    test('Should return 200 on sucess', async () => {
      const password = await hash('123', 12)
      await getRepository('user').save({
        name: 'kauam',
        password,
        email: 'kauam@gmail.com',
        urlImage: 'https://sm.ign.com/ign_br/screenshot/default/avatar-3-jake-sully-out-as-narrator-replaced-by-son-loak-q8g_qny6.jpg'
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
})
