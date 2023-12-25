import { CreateUserCoursesController } from '@/presentation/controllers/user-course'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeCreateUserCourses } from '@/main/factories/usecases/user-course'
import { makeLogControllerDecorator } from '../../decorators'
import { makeCreateUserCourseRules } from '../../rules/user-course'

export const makeCreateUserCoursesController = (): Controller => {
  const createUserCoursesController = new CreateUserCoursesController(makeValidations(makeCreateUserCourseRules()), makeCreateUserCourses())
  return makeLogControllerDecorator(createUserCoursesController)
}
