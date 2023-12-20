import { Router } from 'express'
import { makeCreateLessonController, makeUpdateLessonController } from '../factories/controllers/lesson'
import { adaptRoute } from '../adapters/express'

export default (router: Router): void => {
  router.post('/lesson', adaptRoute(makeCreateLessonController()))
  router.put('/lesson/:id', adaptRoute(makeUpdateLessonController()))
}
