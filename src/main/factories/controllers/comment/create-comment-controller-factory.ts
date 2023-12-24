import { CreateCommentController } from '@/presentation/controllers/comment'
import { Controller } from '@/presentation/protocols'
import { makeCreateComment } from '@/main/factories/usecases/comment'
import { makeLogControllerDecorator } from '../../decorators'
import { makeValidations } from '../../validations'

export const makeCreateCommentController = (): Controller => {
  const requiredFields = ['lessonId', 'userId', 'comment']
  const createCommentController = new CreateCommentController(makeValidations(requiredFields), makeCreateComment())
  return makeLogControllerDecorator(createCommentController)
}
