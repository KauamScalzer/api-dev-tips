import { Router } from 'express'
import { makeCreateCommentController } from '../factories/comment'
import { adaptRoute } from '../adapters/express'

export default (router: Router): void => {
  router.post('/comment', adaptRoute(makeCreateCommentController()))
}
