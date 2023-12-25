import { CreateCommentController } from '@/presentation/controllers/comment'
import { Controller } from '@/presentation/protocols'
import { makeCreateComment } from '@/main/factories/usecases/comment'
import { makeLogControllerDecorator } from '../../decorators'
import { makeValidations } from '../../validations'
import { makeCreateCommentRules } from '../../rules/comment'

export const makeCreateCommentController = (): Controller => {
  const createCommentController = new CreateCommentController(makeValidations(makeCreateCommentRules()), makeCreateComment())
  return makeLogControllerDecorator(createCommentController)
}
