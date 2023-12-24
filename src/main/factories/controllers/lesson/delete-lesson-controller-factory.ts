import { DeleteLessonController } from '@/presentation/controllers/lesson'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeDeleteLesson } from '@/main/factories/usecases/lesson'
import { makeLogControllerDecorator } from '../../decorators'

export const makeDeleteLessonController = (): Controller => {
  const requiredFields = ['id']
  const deleteLessonController = new DeleteLessonController(makeValidations(requiredFields), makeDeleteLesson())
  return makeLogControllerDecorator(deleteLessonController)
}
