import { GetAllCourseController } from '@/presentation/controllers/course'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeGetAllCourse } from '@/main/factories/usecases/course'
import { makeLogControllerDecorator } from '../../decorators'
import { makeGetAllCourseRules } from '../../rules/course'

export const makeGetAllCourseController = (): Controller => {
  const getAllCourseController = new GetAllCourseController(makeValidations(makeGetAllCourseRules()), makeGetAllCourse())
  return makeLogControllerDecorator(getAllCourseController)
}
