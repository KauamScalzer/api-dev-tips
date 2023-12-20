import { UpdateLessonController } from '@/presentation/controllers/lesson'
import { Controller } from '@/presentation/protocols'
import { makeUpdateLessonValidation } from '@/main/factories/validations/lesson'
import { makeUpdateLesson } from '@/main/factories/usecases/lesson'
import { makeLogControllerDecorator } from '../../decorators'

export const makeUpdateLessonController = (): Controller => {
  const updateLessonController = new UpdateLessonController(makeUpdateLessonValidation(), makeUpdateLesson())
  return makeLogControllerDecorator(updateLessonController)
}
