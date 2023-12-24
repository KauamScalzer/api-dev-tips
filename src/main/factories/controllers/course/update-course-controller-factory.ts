import { UpdateCourseController } from '@/presentation/controllers/course'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeUpdateCourse } from '@/main/factories/usecases/course'
import { makeLogControllerDecorator } from '../../decorators'

export const makeUpdateCourseController = (): Controller => {
  const requiredFields = ['name', 'description', 'author', 'thumb', 'id']
  const updateCourseController = new UpdateCourseController(makeValidations(requiredFields), makeUpdateCourse())
  return makeLogControllerDecorator(updateCourseController)
}
