import { DeleteCourseController } from '@/presentation/controllers/course'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeDeleteCourse } from '@/main/factories/usecases/course'
import { makeLogControllerDecorator } from '../../decorators'

export const makeDeleteCourseController = (): Controller => {
  const requiredFields = ['id']
  const deleteCourseController = new DeleteCourseController(makeValidations(requiredFields), makeDeleteCourse())
  return makeLogControllerDecorator(deleteCourseController)
}
