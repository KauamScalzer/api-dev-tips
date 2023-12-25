import { UpdateCourseController } from '@/presentation/controllers/course'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeUpdateCourse } from '@/main/factories/usecases/course'
import { makeLogControllerDecorator } from '../../decorators'
import { makeUpdateCourseRules } from '../../rules/course'

export const makeUpdateCourseController = (): Controller => {
  const updateCourseController = new UpdateCourseController(makeValidations(makeUpdateCourseRules()), makeUpdateCourse())
  return makeLogControllerDecorator(updateCourseController)
}
