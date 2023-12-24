import { GetAllCourseController } from '@/presentation/controllers/course'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeGetAllCourse } from '@/main/factories/usecases/course'
import { makeLogControllerDecorator } from '../../decorators'

export const makeGetAllCourseController = (): Controller => {
  const requiredFields = ['take', 'skip']
  const getAllCourseController = new GetAllCourseController(makeValidations(requiredFields), makeGetAllCourse())
  return makeLogControllerDecorator(getAllCourseController)
}
