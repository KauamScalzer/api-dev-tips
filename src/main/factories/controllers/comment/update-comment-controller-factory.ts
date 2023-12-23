import { UpdateCommentController } from '@/presentation/controllers/comment'
import { Controller } from '@/presentation/protocols'
import { makeUpdateCommentValidation } from '@/main/factories/validations/comment'
import { makeUpdateComment } from '@/main/factories/usecases/comment'
import { makeLogControllerDecorator } from '../../decorators'

export const makeUpdateCommentController = (): Controller => {
  const updateCommentController = new UpdateCommentController(makeUpdateCommentValidation(), makeUpdateComment())
  return makeLogControllerDecorator(updateCommentController)
}
