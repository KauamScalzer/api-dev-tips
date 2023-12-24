import { DeleteCommentController } from '@/presentation/controllers/comment'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeDeleteComment } from '@/main/factories/usecases/comment'
import { makeLogControllerDecorator } from '../../decorators'

export const makeDeleteCommentController = (): Controller => {
  const requiredFields = ['id']
  const deleteCommentController = new DeleteCommentController(makeValidations(requiredFields), makeDeleteComment())
  return makeLogControllerDecorator(deleteCommentController)
}
