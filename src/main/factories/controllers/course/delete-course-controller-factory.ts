import { DeleteCourseController } from '@/presentation/controllers/course'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeDeleteCourseValidation } from '@/main/factories/validations/course'
import { makeDeleteCourse } from '@/main/factories/usecases/course'

export const makeDeleteCourseController = (): Controller => {
  const deleteCourseController = new DeleteCourseController(makeDeleteCourseValidation(), makeDeleteCourse())
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(deleteCourseController, createLogErrorRepository)
}
