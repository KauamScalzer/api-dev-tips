import { GetAllCommentsByLessonController } from '@/presentation/controllers/comment'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeGetAllCommentsByLesson } from '@/main/factories/usecases/comment'
import { makeLogControllerDecorator } from '../../decorators'

export const makeGetAllCommentsByLessonController = (): Controller => {
  const requiredFields = ['lessonId', 'skip', 'take']
  const getAllCommentsByLessonController = new GetAllCommentsByLessonController(makeValidations(requiredFields), makeGetAllCommentsByLesson())
  return makeLogControllerDecorator(getAllCommentsByLessonController)
}
