import { CreateUserCoursesController } from '@/presentation/controllers/user-course'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeCreateUserCourses } from '@/main/factories/usecases/user-course'
import { makeLogControllerDecorator } from '../../decorators'

export const makeCreateUserCoursesController = (): Controller => {
  const requiredFields = ['userId', 'courseIds']
  const createUserCoursesController = new CreateUserCoursesController(makeValidations(requiredFields), makeCreateUserCourses())
  return makeLogControllerDecorator(createUserCoursesController)
}
