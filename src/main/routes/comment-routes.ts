import { Router } from 'express'
import { makeCreateCommentController, makeGetAllCommentsByLessonController } from '../factories/controllers/comment'
import { adaptRoute } from '../adapters/express'

export default (router: Router): void => {
  router.post('/comment', adaptRoute(makeCreateCommentController()))
  router.get('/comment/:lessonId', adaptRoute(makeGetAllCommentsByLessonController()))
}
