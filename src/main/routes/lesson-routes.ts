import { Router } from 'express'
import { makeCreateLessonController, makeUpdateLessonController, makeGetAllLessonByCourseController, makeDeleteLessonController } from '../factories/controllers/lesson'
import { adaptRoute } from '../adapters/express'

export default (router: Router): void => {
  router.post('/lesson', adaptRoute(makeCreateLessonController()))
  router.put('/lesson/:id', adaptRoute(makeUpdateLessonController()))
  router.get('/lesson/by-course/:courseId', adaptRoute(makeGetAllLessonByCourseController()))
  router.delete('/lesson/:id', adaptRoute(makeDeleteLessonController()))
}
