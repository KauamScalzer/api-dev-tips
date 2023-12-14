import { GetAllCourseByUserController } from '@/presentation/controllers/course'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeGetAllCourseByUserValidation } from '@/main/factories/validations/course'
import { makeGetAllCourseByUser } from '@/main/factories/usecases/course'

export const makeGetAllCourseByUserController = (): Controller => {
  const getAllCourseByUserController = new GetAllCourseByUserController(makeGetAllCourseByUserValidation(), makeGetAllCourseByUser())
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(getAllCourseByUserController, createLogErrorRepository)
}
