import { CreateLessonController } from '@/presentation/controllers/lesson'
import { Controller } from '@/presentation/protocols'
import { makeCreateLessonValidation } from '@/main/factories/validations/lesson'
import { makeCreateLesson } from '@/main/factories/usecases/lesson'
import { makeLogControllerDecorator } from '../../decorators'

export const makeCreateLessonController = (): Controller => {
  const createLessonController = new CreateLessonController(makeCreateLessonValidation(), makeCreateLesson())
  return makeLogControllerDecorator(createLessonController)
}
