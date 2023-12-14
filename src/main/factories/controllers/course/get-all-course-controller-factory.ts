import { GetAllCourseController } from '@/presentation/controllers/course'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeGetAllCourseValidation } from '@/main/factories/validations/course'
import { makeGetAllCourse } from '@/main/factories/usecases/course'

export const makeGetAllCourseController = (): Controller => {
  const getAllCourseController = new GetAllCourseController(makeGetAllCourse(), makeGetAllCourseValidation())
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(getAllCourseController, createLogErrorRepository)
}
