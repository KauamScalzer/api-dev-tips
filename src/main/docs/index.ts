import { userPath } from './paths/user-path'
import { userSchema } from './schemas/user-schema'
import { createUserParamsSchema } from './schemas/create-user-params-schema'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Dev Tips API',
    description: 'API feita para estudos com base no curso do Mango',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'User'
  }],
  paths: {
    '/user': userPath
  },
  schemas: {
    user: userSchema,
    createUserParams: createUserParamsSchema
  }
}
