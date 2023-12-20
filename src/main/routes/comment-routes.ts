import { Router } from 'express'
import { makeCreateCommentController, makeGetAllCommentsByLessonController, makeDeleteCommentController } from '../factories/controllers/comment'
import { adaptRoute } from '../adapters/express'

export default (router: Router): void => {
  router.post('/comment', adaptRoute(makeCreateCommentController()))
  router.get('/comment/:lessonId', adaptRoute(makeGetAllCommentsByLessonController()))
  router.delete('/comment/:id', adaptRoute(makeDeleteCommentController()))
}
