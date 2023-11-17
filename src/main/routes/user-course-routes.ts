import { Router } from 'express'
import { makeCreateUserCoursesController } from '../factories/controllers/user-course'
import { adaptRoute } from '../adapters/express'

export default (router: Router): void => {
  router.post('/user-course', adaptRoute(makeCreateUserCoursesController()))
}
