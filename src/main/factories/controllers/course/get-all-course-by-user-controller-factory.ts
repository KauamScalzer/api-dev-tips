import { GetAllCourseByUserController } from '@/presentation/controllers/course'
import { GetAllCourseByUser } from '@/data/usecases/course'
import { GetAllUserCourseByUserRepository } from '@/infra/db/repositories/user-course'
import { GetOneCourseRepository } from '@/infra/db/repositories/course'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeGetAllCourseByUserValidation } from '@/main/factories/validations/course'

export const makeGetAllCourseByUserController = (): Controller => {
  const getOneCourseRepository = new GetOneCourseRepository()
  const getAllUserCourseByUserRepository = new GetAllUserCourseByUserRepository()
  const getAllCourseByUser = new GetAllCourseByUser(getAllUserCourseByUserRepository, getOneCourseRepository)
  const getAllCourseByUserController = new GetAllCourseByUserController(getAllCourseByUser, makeGetAllCourseByUserValidation())
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(getAllCourseByUserController, createLogErrorRepository)
}
