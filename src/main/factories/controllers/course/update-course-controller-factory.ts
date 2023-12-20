import { UpdateCourseController } from '@/presentation/controllers/course'
import { Controller } from '@/presentation/protocols'
import { makeUpdateCourseValidation } from '@/main/factories/validations/course'
import { makeUpdateCourse } from '@/main/factories/usecases/course'
import { makeLogControllerDecorator } from '../../decorators'

export const makeUpdateCourseController = (): Controller => {
  const updateCourseController = new UpdateCourseController(makeUpdateCourseValidation(), makeUpdateCourse())
  return makeLogControllerDecorator(updateCourseController)
}
