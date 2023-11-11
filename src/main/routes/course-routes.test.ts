import request from 'supertest'
import app from '../config/app'
import { TypeormHelper } from '@/infra/db/helpers/typeorm-helper'

describe('Course Routes', () => {
  beforeAll(async () => {
    await TypeormHelper.connect()
  })

  afterEach(async () => {
    await TypeormHelper.clear('course')
  })

  afterAll(async () => {
    await TypeormHelper.desconnect()
  })

  describe('POST /course', () => {
    test('Should return 200 on sucess', async () => {
      await request(app).post('/api/course')
        .send({
          name: 'Javascript completo',
          description: 'Nesse curso você irá aprender a programar em Javascript',
          author: 'Kauam Scalzer',
          thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUdrOIue5OnpMcJgKPLOUppxTBMWsuCGeu5w&usqp=CAU'
        })
        .expect(204)
    })
  })
})