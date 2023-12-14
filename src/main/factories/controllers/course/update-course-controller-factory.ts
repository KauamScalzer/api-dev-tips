import { UpdateCourseController } from '@/presentation/controllers/course'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeUpdateCourseValidation } from '@/main/factories/validations/course'
import { makeUpdateCourse } from '@/main/factories/usecases/course'

export const makeUpdateCourseController = (): Controller => {
  const updateCourseController = new UpdateCourseController(makeUpdateCourseValidation(), makeUpdateCourse())
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(updateCourseController, createLogErrorRepository)
}
