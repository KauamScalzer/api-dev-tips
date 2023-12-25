import { CreateLessonController } from '@/presentation/controllers/lesson'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeCreateLesson } from '@/main/factories/usecases/lesson'
import { makeLogControllerDecorator } from '../../decorators'
import { makeCreateLessonRules } from '../../rules/lesson'

export const makeCreateLessonController = (): Controller => {
  const createLessonController = new CreateLessonController(makeValidations(makeCreateLessonRules()), makeCreateLesson())
  return makeLogControllerDecorator(createLessonController)
}
