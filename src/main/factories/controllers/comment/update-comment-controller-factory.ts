import { UpdateCommentController } from '@/presentation/controllers/comment'
import { Controller } from '@/presentation/protocols'
import { NotExistFieldValitation, makeValidations } from '@/main/factories/validations'
import { makeUpdateComment } from '@/main/factories/usecases/comment'
import { makeLogControllerDecorator } from '../../decorators'
import { Comment } from '@/infra/db/typeorm/models'

export const makeUpdateCommentController = (): Controller => {
  const requiredFields = ['id', 'comment']
  const notExistFieldValitation: NotExistFieldValitation[] = [{
    field: 'id',
    model: Comment
  }]
  const updateCommentController = new UpdateCommentController(makeValidations(requiredFields, null, null, null, notExistFieldValitation), makeUpdateComment())
  return makeLogControllerDecorator(updateCommentController)
}
