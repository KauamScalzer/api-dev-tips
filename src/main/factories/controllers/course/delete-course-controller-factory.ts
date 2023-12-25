import { DeleteCourseController } from '@/presentation/controllers/course'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeDeleteCourse } from '@/main/factories/usecases/course'
import { makeLogControllerDecorator } from '../../decorators'
import { makeDeleteCourseRules } from '../../rules/course'

export const makeDeleteCourseController = (): Controller => {
  const deleteCourseController = new DeleteCourseController(makeValidations(makeDeleteCourseRules()), makeDeleteCourse())
  return makeLogControllerDecorator(deleteCourseController)
}
