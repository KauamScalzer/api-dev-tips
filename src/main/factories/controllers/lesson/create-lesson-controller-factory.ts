import { CreateLessonController } from '@/presentation/controllers/lesson'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeCreateLesson } from '@/main/factories/usecases/lesson'
import { makeLogControllerDecorator } from '../../decorators'

export const makeCreateLessonController = (): Controller => {
  const requiredFields = ['courseId', 'name', 'description', 'urlVideo']
  const createLessonController = new CreateLessonController(makeValidations(requiredFields), makeCreateLesson())
  return makeLogControllerDecorator(createLessonController)
}
