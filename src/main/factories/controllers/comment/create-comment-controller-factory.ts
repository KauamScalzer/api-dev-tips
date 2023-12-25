import { CreateCommentController } from '@/presentation/controllers/comment'
import { Controller } from '@/presentation/protocols'
import { makeCreateComment } from '@/main/factories/usecases/comment'
import { makeLogControllerDecorator } from '../../decorators'
import { NotExistFieldValitation, makeValidations } from '../../validations'
import { Lesson, User } from '@/infra/db/typeorm/models'

export const makeCreateCommentController = (): Controller => {
  const requiredFields = ['lessonId', 'userId', 'comment']
  const notExistFieldValitation: NotExistFieldValitation[] = [{
    field: 'userId',
    model: User
  },
  {
    field: 'lessonId',
    model: Lesson
  }]
  const createCommentController = new CreateCommentController(makeValidations(requiredFields, null, null, null, notExistFieldValitation), makeCreateComment())
  return makeLogControllerDecorator(createCommentController)
}
