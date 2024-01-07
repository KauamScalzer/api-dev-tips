import { createUserPath, userPaths, userAuthenticationPath } from './paths/user'
import { createUserResultSchema, createUserParamsSchema, errorSchema, userAuthenticationParamsSchema, updateUserParamsSchema, getOneUserResultSchema } from './schemas/user'
import { badRequest, conflict, serverError, notFound, unauthorized } from './components'
import { createCoursePath } from './paths/course/create-course-path'
import { createCourseParamsSchema } from './schemas/course'

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
  tags: [
    {
      name: 'User'
    },
    {
      name: 'Course'
    }],
  paths: {
    '/user': createUserPath,
    '/user/authentication': userAuthenticationPath,
    '/user/{id}': userPaths,
    '/course': createCoursePath
  },
  schemas: {
    createUserResult: createUserResultSchema,
    createUserParams: createUserParamsSchema,
    error: errorSchema,
    userAuthenticationParams: userAuthenticationParamsSchema,
    updateUserParams: updateUserParamsSchema,
    getOneUserResult: getOneUserResultSchema,
    createCourseParams: createCourseParamsSchema
  },
  components: {
    badRequest,
    conflict,
    serverError,
    notFound,
    unauthorized
  }
}
