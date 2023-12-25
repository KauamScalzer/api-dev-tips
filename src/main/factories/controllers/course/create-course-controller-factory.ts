import { CreateCourseController } from '@/presentation/controllers/course'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeCreateCourse } from '@/main/factories/usecases/course'
import { makeLogControllerDecorator } from '../../decorators'
import { makeCreateCourseRules } from '../../rules/course'

export const makeCreateCourseController = (): Controller => {
  const createCourseController = new CreateCourseController(makeValidations(makeCreateCourseRules()), makeCreateCourse())
  return makeLogControllerDecorator(createCourseController)
}
