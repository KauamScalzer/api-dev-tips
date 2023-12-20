import { CreateCommentController } from '@/presentation/controllers/comment'
import { Controller } from '@/presentation/protocols'
import { makeCreateCommentValidation } from '@/main/factories/validations/comment'
import { makeCreateComment } from '@/main/factories/usecases/comment'
import { makeLogControllerDecorator } from '../../decorators'

export const makeCreateCommentController = (): Controller => {
  const createCommentController = new CreateCommentController(makeCreateCommentValidation(), makeCreateComment())
  return makeLogControllerDecorator(createCommentController)
}
