import { GetAllCourseByUserController } from '@/presentation/controllers/course'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeGetAllCourseByUser } from '@/main/factories/usecases/course'
import { makeLogControllerDecorator } from '../../decorators'

export const makeGetAllCourseByUserController = (): Controller => {
  const requiredFields = ['take', 'skip', 'userId']
  const getAllCourseByUserController = new GetAllCourseByUserController(makeValidations(requiredFields), makeGetAllCourseByUser())
  return makeLogControllerDecorator(getAllCourseByUserController)
}
