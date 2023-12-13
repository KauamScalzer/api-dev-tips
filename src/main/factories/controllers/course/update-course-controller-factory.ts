import { UpdateCourseController } from '@/presentation/controllers/course'
import { UpdateCourse } from '@/data/usecases/course'
import { UpdateCourseRepository } from '@/infra/db/repositories/course'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeUpdateCourseValidation } from '@/main/factories/validations/course'

export const makeUpdateCourseController = (): Controller => {
  const updateCourseRepository = new UpdateCourseRepository()
  const updateCourse = new UpdateCourse(updateCourseRepository)
  const updateCourseController = new UpdateCourseController(makeUpdateCourseValidation(), updateCourse)
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(updateCourseController, createLogErrorRepository)
}
