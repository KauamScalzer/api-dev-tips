import { createUserPath, userPaths, userAuthenticationPath } from './paths/user'
import { createUserResultSchema, createUserParamsSchema, userAuthenticationParamsSchema, updateUserParamsSchema, getOneUserResultSchema } from './schemas/user'
import { badRequest, conflict, serverError, notFound, unauthorized } from './components'
import { coursePaths, createCoursePath, getAllCourseByUserPath, getAllCoursePath } from './paths/course'
import { createCourseParamsSchema, createCourseResultSchema, getAllCourseResultSchema } from './schemas/course'
import { errorSchema } from './schemas/error'
import { commentPaths, createCommentPath, getAllCommentByLessonPath } from './paths/comment'
import { createCommentParamsSchema, createCommentResultSchema, getAllCommentByLessonResultSchema, updateCommentParamsSchema } from './schemas/comment'
import { createLessonPath } from './paths/lesson'
import { createLessonParamsSchema, createLessonResultSchema } from './schemas/lesson'

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
    },
    {
      name: 'Comment'
    },
    {
      name: 'Lesson'
    }
  ],
  paths: {
    '/user': createUserPath,
    '/user/authentication': userAuthenticationPath,
    '/user/{id}': userPaths,
    '/course': createCoursePath,
    '/course?skip=1&take=10': getAllCoursePath,
    '/course/by-user/{id}?skip=1&take=10': getAllCourseByUserPath,
    '/course/{id}': coursePaths,
    '/comment': createCommentPath,
    '/comment/{id}?skip=1&take=10': getAllCommentByLessonPath,
    '/comment/{id}': commentPaths,
    '/lesson': createLessonPath
  },
  schemas: {
    createUserResult: createUserResultSchema,
    createUserParams: createUserParamsSchema,
    error: errorSchema,
    userAuthenticationParams: userAuthenticationParamsSchema,
    updateUserParams: updateUserParamsSchema,
    getOneUserResult: getOneUserResultSchema,
    createCourseParams: createCourseParamsSchema,
    createCourseResult: createCourseResultSchema,
    getAllCourseResult: getAllCourseResultSchema,
    createCommentParams: createCommentParamsSchema,
    createCommentResult: createCommentResultSchema,
    getAllCommentByLessonResult: getAllCommentByLessonResultSchema,
    updateCommentParams: updateCommentParamsSchema,
    createLessonParams: createLessonParamsSchema,
    createLessonResult: createLessonResultSchema
  },
  components: {
    badRequest,
    conflict,
    serverError,
    notFound,
    unauthorized
  }
}
