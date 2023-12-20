import { GetAllCommentsByLessonController } from '@/presentation/controllers/comment'
import { Controller } from '@/presentation/protocols'
import { makeGetAllCommentsByLessonValidation } from '@/main/factories/validations/comment'
import { makeGetAllCommentsByLesson } from '@/main/factories/usecases/comment'
import { makeLogControllerDecorator } from '../../decorators'

export const makeGetAllCommentsByLessonController = (): Controller => {
  const getAllCommentsByLessonController = new GetAllCommentsByLessonController(makeGetAllCommentsByLessonValidation(), makeGetAllCommentsByLesson())
  return makeLogControllerDecorator(getAllCommentsByLessonController)
}
