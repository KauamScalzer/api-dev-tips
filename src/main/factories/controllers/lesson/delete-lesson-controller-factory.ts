import { DeleteLessonController } from '@/presentation/controllers/lesson'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeDeleteLesson } from '@/main/factories/usecases/lesson'
import { makeLogControllerDecorator } from '../../decorators'
import { makeDeleteLessonRules } from '../../rules/lesson'

export const makeDeleteLessonController = (): Controller => {
  const deleteLessonController = new DeleteLessonController(makeValidations(makeDeleteLessonRules()), makeDeleteLesson())
  return makeLogControllerDecorator(deleteLessonController)
}
