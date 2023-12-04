import { Router } from 'express'
import { makeCreateCourseController, makeGetAllCourseController, makeUpdateCourseController, makeDeleteCourseController, makeGetAllCourseByUserController } from '../factories/controllers/course'
import { adaptRoute } from '../adapters/express'

export default (router: Router): void => {
  router.post('/course', adaptRoute(makeCreateCourseController()))
  router.get('/course', adaptRoute(makeGetAllCourseController()))
  router.put('/course/:id', adaptRoute(makeUpdateCourseController()))
  router.delete('/course/:id', adaptRoute(makeDeleteCourseController()))
  router.get('/course/by-user/:userId', adaptRoute(makeGetAllCourseByUserController()))
}
