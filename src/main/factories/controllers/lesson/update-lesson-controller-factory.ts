import { UpdateLessonController } from '@/presentation/controllers/lesson'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeUpdateLesson } from '@/main/factories/usecases/lesson'
import { makeLogControllerDecorator } from '../../decorators'
import { makeUpdateLessonRules } from '../../rules/lesson'

export const makeUpdateLessonController = (): Controller => {
  const updateLessonController = new UpdateLessonController(makeValidations(makeUpdateLessonRules()), makeUpdateLesson())
  return makeLogControllerDecorator(updateLessonController)
}
