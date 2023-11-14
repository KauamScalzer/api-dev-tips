import { Router } from 'express'
import { makeCreateLessonController } from '../factories/lesson'
import { adaptRoute } from '../adapters/express'

export default (router: Router): void => {
  router.post('/lesson', adaptRoute(makeCreateLessonController()))
}
