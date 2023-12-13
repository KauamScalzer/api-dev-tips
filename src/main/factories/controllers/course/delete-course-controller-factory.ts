import { DeleteCourseController } from '@/presentation/controllers/course'
import { DeleteCourse } from '@/data/usecases/course'
import { DeleteCourseRepository } from '@/infra/db/repositories/course'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeDeleteCourseValidation } from '@/main/factories/validations/course'

export const makeDeleteCourseController = (): Controller => {
  const deleteCourseRepository = new DeleteCourseRepository()
  const deleteCourse = new DeleteCourse(deleteCourseRepository)
  const deleteCourseController = new DeleteCourseController(makeDeleteCourseValidation(), deleteCourse)
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(deleteCourseController, createLogErrorRepository)
}
