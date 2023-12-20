import { GetAllCourseController } from '@/presentation/controllers/course'
import { Controller } from '@/presentation/protocols'
import { makeGetAllCourseValidation } from '@/main/factories/validations/course'
import { makeGetAllCourse } from '@/main/factories/usecases/course'
import { makeLogControllerDecorator } from '../../decorators'

export const makeGetAllCourseController = (): Controller => {
  const getAllCourseController = new GetAllCourseController(makeGetAllCourseValidation(), makeGetAllCourse())
  return makeLogControllerDecorator(getAllCourseController)
}
