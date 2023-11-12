import { Router } from 'express'
import { makeCreateUserCoursesController } from '../factories/user-course'
import { adaptRoute } from '../adapters/express'

export default (router: Router): void => {
  router.post('/user-course', adaptRoute(makeCreateUserCoursesController()))
}
