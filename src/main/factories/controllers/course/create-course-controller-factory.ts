import { CreateCourseController } from '@/presentation/controllers/course'
import { Controller } from '@/presentation/protocols'
import { makeCreateCourseValidation } from '@/main/factories/validations/course'
import { makeCreateCourse } from '@/main/factories/usecases/course'
import { makeLogControllerDecorator } from '../../decorators'

export const makeCreateCourseController = (): Controller => {
  const createCourseController = new CreateCourseController(makeCreateCourseValidation(), makeCreateCourse())
  return makeLogControllerDecorator(createCourseController)
}
