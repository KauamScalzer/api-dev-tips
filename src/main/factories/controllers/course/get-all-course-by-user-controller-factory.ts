import { GetAllCourseByUserController } from '@/presentation/controllers/course'
import { Controller } from '@/presentation/protocols'
import { makeGetAllCourseByUserValidation } from '@/main/factories/validations/course'
import { makeGetAllCourseByUser } from '@/main/factories/usecases/course'
import { makeLogControllerDecorator } from '../../decorators'

export const makeGetAllCourseByUserController = (): Controller => {
  const getAllCourseByUserController = new GetAllCourseByUserController(makeGetAllCourseByUserValidation(), makeGetAllCourseByUser())
  return makeLogControllerDecorator(getAllCourseByUserController)
}
