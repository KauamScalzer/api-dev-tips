import { CreateUserCoursesController } from '@/presentation/controllers/user-course'
import { Controller } from '@/presentation/protocols'
import { makeCreateUserCoursesValidation } from '@/main/factories/validations/user-course'
import { makeCreateUserCourses } from '@/main/factories/usecases/user-course'
import { makeLogControllerDecorator } from '../../decorators'

export const makeCreateUserCoursesController = (): Controller => {
  const createUserCoursesController = new CreateUserCoursesController(makeCreateUserCoursesValidation(), makeCreateUserCourses())
  return makeLogControllerDecorator(createUserCoursesController)
}
