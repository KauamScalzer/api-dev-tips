import { CreateCourseController } from '@/presentation/controllers/course'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeCreateCourse } from '@/main/factories/usecases/course'
import { makeLogControllerDecorator } from '../../decorators'

export const makeCreateCourseController = (): Controller => {
  const requiredFields = ['name', 'description', 'author', 'thumb']
  const createCourseController = new CreateCourseController(makeValidations(requiredFields), makeCreateCourse())
  return makeLogControllerDecorator(createCourseController)
}
