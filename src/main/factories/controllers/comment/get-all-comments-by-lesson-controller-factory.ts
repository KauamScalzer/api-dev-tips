import { GetAllCommentsByLessonController } from '@/presentation/controllers/comment'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeGetAllCommentsByLesson } from '@/main/factories/usecases/comment'
import { makeLogControllerDecorator } from '../../decorators'
import { makeGetAllCommentsByLessonRules } from '../../rules/comment'

export const makeGetAllCommentsByLessonController = (): Controller => {
  const getAllCommentsByLessonController = new GetAllCommentsByLessonController(makeValidations(makeGetAllCommentsByLessonRules()), makeGetAllCommentsByLesson())
  return makeLogControllerDecorator(getAllCommentsByLessonController)
}
