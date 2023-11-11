import { Router } from 'express'
import { makeCreateCourseController } from '../factories/course'
import { adaptRoute } from '../adapters/express'

export default (router: Router): void => {
  router.post('/course', adaptRoute(makeCreateCourseController()))
}
