import { CreateCourseController } from '@/presentation/controllers/course'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeCreateCourseValidation } from '@/main/factories/validations/course'
import { makeCreateCourse } from '@/main/factories/usecases/course'

export const makeCreateCourseController = (): Controller => {
  const createCourseController = new CreateCourseController(makeCreateCourseValidation(), makeCreateCourse())
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(createCourseController, createLogErrorRepository)
}
