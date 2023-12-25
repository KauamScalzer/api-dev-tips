import { DeleteCommentController } from '@/presentation/controllers/comment'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeDeleteComment } from '@/main/factories/usecases/comment'
import { makeLogControllerDecorator } from '../../decorators'
import { makeDeleteCommentRules } from '../../rules/comment'

export const makeDeleteCommentController = (): Controller => {
  const deleteCommentController = new DeleteCommentController(makeValidations(makeDeleteCommentRules()), makeDeleteComment())
  return makeLogControllerDecorator(deleteCommentController)
}
