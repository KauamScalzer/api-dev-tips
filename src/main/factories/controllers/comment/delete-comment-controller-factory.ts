import { DeleteCommentController } from '@/presentation/controllers/comment'
import { Controller } from '@/presentation/protocols'
import { makeDeleteCommentValidation } from '@/main/factories/validations/comment'
import { makeDeleteComment } from '@/main/factories/usecases/comment'
import { makeLogControllerDecorator } from '../../decorators'

export const makeDeleteCommentController = (): Controller => {
  const deleteCommentController = new DeleteCommentController(makeDeleteCommentValidation(), makeDeleteComment())
  return makeLogControllerDecorator(deleteCommentController)
}
