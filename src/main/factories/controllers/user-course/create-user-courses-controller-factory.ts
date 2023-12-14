import { CreateUserCoursesController } from '@/presentation/controllers/user-course'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeCreateUserCoursesValidation } from '@/main/factories/validations/user-course'
import { makeCreateUserCourses } from '@/main/factories/usecases/user-course'

export const makeCreateUserCoursesController = (): Controller => {
  const createUserCoursesController = new CreateUserCoursesController(makeCreateUserCoursesValidation(), makeCreateUserCourses())
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(createUserCoursesController, createLogErrorRepository)
}
