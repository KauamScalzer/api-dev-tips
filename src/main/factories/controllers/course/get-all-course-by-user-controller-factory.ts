import { GetAllCourseByUserController } from '@/presentation/controllers/course'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeGetAllCourseByUser } from '@/main/factories/usecases/course'
import { makeLogControllerDecorator } from '../../decorators'
import { makeGetAllCourseByUserRules } from '../../rules/course'

export const makeGetAllCourseByUserController = (): Controller => {
  const getAllCourseByUserController = new GetAllCourseByUserController(makeValidations(makeGetAllCourseByUserRules()), makeGetAllCourseByUser())
  return makeLogControllerDecorator(getAllCourseByUserController)
}
