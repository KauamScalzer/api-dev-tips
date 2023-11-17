import { GetAllCourseController } from '@/presentation/controllers/course'
import { GetAllCourse } from '@/data/usecases/course'
import { GetAllCourseRepository } from '@/infra/db/repositories/course'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeGetAllCourseValidation } from '@/main/factories/validations/course'

export const makeGetAllCourseController = (): Controller => {
  const getAllCourseRepository = new GetAllCourseRepository()
  const getAllCourse = new GetAllCourse(getAllCourseRepository)
  const getAllCourseController = new GetAllCourseController(getAllCourse, makeGetAllCourseValidation())
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(getAllCourseController, createLogErrorRepository)
}
