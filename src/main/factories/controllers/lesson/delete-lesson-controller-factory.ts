import { DeleteLessonController } from '@/presentation/controllers/lesson'
import { Controller } from '@/presentation/protocols'
import { makeDeleteLessonValidation } from '@/main/factories/validations/lesson'
import { makeDeleteLesson } from '@/main/factories/usecases/lesson'
import { makeLogControllerDecorator } from '../../decorators'

export const makeDeleteLessonController = (): Controller => {
  const deleteLessonController = new DeleteLessonController(makeDeleteLessonValidation(), makeDeleteLesson())
  return makeLogControllerDecorator(deleteLessonController)
}
