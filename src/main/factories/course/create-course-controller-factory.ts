import { CreateCourseController } from '@/presentation/controllers/course'
import { CreateCourse } from '@/data/usecases/course'
import { CreateCourseRepository } from '@/infra/db/repositories/course'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeCreateCourseValidation } from './validations'

export const makeCreateCourseController = (): Controller => {
  const createCourseRepository = new CreateCourseRepository()
  const createCourse = new CreateCourse(createCourseRepository)
  const createCourseController = new CreateCourseController(makeCreateCourseValidation(), createCourse)
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(createCourseController, createLogErrorRepository)
}
