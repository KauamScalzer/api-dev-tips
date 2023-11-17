import { CreateUserCoursesController } from '@/presentation/controllers/user-course'
import { CreateUserCourses } from '@/data/usecases/user-course'
import { CreateUserCourseRepository } from '@/infra/db/repositories/user-course'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeCreateUserCoursesValidation } from '@/main/factories/validations/user-course'

export const makeCreateUserCoursesController = (): Controller => {
  const createUserCourseRepository = new CreateUserCourseRepository()
  const createUserCourses = new CreateUserCourses(createUserCourseRepository)
  const createUserCoursesController = new CreateUserCoursesController(makeCreateUserCoursesValidation(), createUserCourses)
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(createUserCoursesController, createLogErrorRepository)
}
