import { UpdateCommentController } from '@/presentation/controllers/comment'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeUpdateComment } from '@/main/factories/usecases/comment'
import { makeLogControllerDecorator } from '../../decorators'

export const makeUpdateCommentController = (): Controller => {
  const requiredFields = ['id', 'comment']
  const updateCommentController = new UpdateCommentController(makeValidations(requiredFields), makeUpdateComment())
  return makeLogControllerDecorator(updateCommentController)
}
