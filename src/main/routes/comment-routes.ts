import { Router } from 'express'
import { makeCreateCommentController } from '../factories/controllers/comment'
import { adaptRoute } from '../adapters/express'

export default (router: Router): void => {
  router.post('/comment', adaptRoute(makeCreateCommentController()))
}
