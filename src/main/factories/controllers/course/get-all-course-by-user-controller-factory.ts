import { GetAllCourseByUserController } from '@/presentation/controllers/course'
import { GetAllCourseByUser } from '@/data/usecases/course'
import { GetAllCourseByUserRepository } from '@/infra/db/repositories/course'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeGetAllCourseByUserValidation } from '@/main/factories/validations/course'

export const makeGetAllCourseByUserController = (): Controller => {
  const getAllCourseByUserRepository = new GetAllCourseByUserRepository()
  const getAllCourseByUser = new GetAllCourseByUser(getAllCourseByUserRepository)
  const getAllCourseByUserController = new GetAllCourseByUserController(getAllCourseByUser, makeGetAllCourseByUserValidation())
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(getAllCourseByUserController, createLogErrorRepository)
}
