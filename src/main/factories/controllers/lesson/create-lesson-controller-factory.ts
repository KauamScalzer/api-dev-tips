import { CreateLessonController } from '@/presentation/controllers/lesson'
import { CreateLesson } from '@/data/usecases/lesson'
import { CreateLessonRepository } from '@/infra/db/repositories/lesson'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeCreateLessonValidation } from '@/main/factories/validations/lesson'

export const makeCreateLessonController = (): Controller => {
  const createLessonRepository = new CreateLessonRepository()
  const createLesson = new CreateLesson(createLessonRepository)
  const createLessonController = new CreateLessonController(createLesson, makeCreateLessonValidation())
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(createLessonController, createLogErrorRepository)
}
