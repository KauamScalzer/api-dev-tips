import { GetAllLessonByCourseController } from '@/presentation/controllers/lesson'
import { Controller } from '@/presentation/protocols'
import { makeGetAllLessonByCourseValidation } from '@/main/factories/validations/lesson'
import { makeGetAllLessonByCourse } from '@/main/factories/usecases/lesson'
import { makeLogControllerDecorator } from '../../decorators'

export const makeGetAllLessonByCourseController = (): Controller => {
  const getAllLessonByCourseController = new GetAllLessonByCourseController(makeGetAllLessonByCourseValidation(), makeGetAllLessonByCourse())
  return makeLogControllerDecorator(getAllLessonByCourseController)
}
