import { UpdateLessonController } from '@/presentation/controllers/lesson'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeCreateLessonValidation } from '@/main/factories/validations/lesson'
import { makeUpdateLesson } from '@/main/factories/usecases/lesson'

export const makeUpdateLessonController = (): Controller => {
  const updateLessonController = new UpdateLessonController(makeCreateLessonValidation(), makeUpdateLesson())
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(updateLessonController, createLogErrorRepository)
}
