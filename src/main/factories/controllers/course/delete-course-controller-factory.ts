import { DeleteCourseController } from '@/presentation/controllers/course'
import { Controller } from '@/presentation/protocols'
import { makeDeleteCourseValidation } from '@/main/factories/validations/course'
import { makeDeleteCourse } from '@/main/factories/usecases/course'
import { makeLogControllerDecorator } from '../../decorators'

export const makeDeleteCourseController = (): Controller => {
  const deleteCourseController = new DeleteCourseController(makeDeleteCourseValidation(), makeDeleteCourse())
  return makeLogControllerDecorator(deleteCourseController)
}
