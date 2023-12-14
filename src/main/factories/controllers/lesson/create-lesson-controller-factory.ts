import { CreateLessonController } from '@/presentation/controllers/lesson'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeCreateLessonValidation } from '@/main/factories/validations/lesson'
import { makeCreateLesson } from '@/main/factories/usecases/lesson'

export const makeCreateLessonController = (): Controller => {
  const createLessonController = new CreateLessonController(makeCreateLesson(), makeCreateLessonValidation())
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(createLessonController, createLogErrorRepository)
}
