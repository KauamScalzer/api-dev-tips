import { Router } from 'express'
import { makeCreateCourseController, makeGetAllCourseController } from '../factories/course'
import { adaptRoute } from '../adapters/express'

export default (router: Router): void => {
  router.post('/course', adaptRoute(makeCreateCourseController()))
  router.get('/course', adaptRoute(makeGetAllCourseController()))
}
