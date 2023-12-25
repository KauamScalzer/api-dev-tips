import { UpdateCommentController } from '@/presentation/controllers/comment'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeUpdateComment } from '@/main/factories/usecases/comment'
import { makeLogControllerDecorator } from '../../decorators'
import { makeUpdateCommentRules } from '../../rules/comment'

export const makeUpdateCommentController = (): Controller => {
  const updateCommentController = new UpdateCommentController(makeValidations(makeUpdateCommentRules()), makeUpdateComment())
  return makeLogControllerDecorator(updateCommentController)
}
