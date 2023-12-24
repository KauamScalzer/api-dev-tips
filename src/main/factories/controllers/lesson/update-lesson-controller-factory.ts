import { UpdateLessonController } from '@/presentation/controllers/lesson'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeUpdateLesson } from '@/main/factories/usecases/lesson'
import { makeLogControllerDecorator } from '../../decorators'

export const makeUpdateLessonController = (): Controller => {
  const requiredFields = ['id', 'courseId', 'name', 'description', 'urlVideo']
  const updateLessonController = new UpdateLessonController(makeValidations(requiredFields), makeUpdateLesson())
  return makeLogControllerDecorator(updateLessonController)
}
