import { GetAllLessonByCourseController } from '@/presentation/controllers/lesson'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeGetAllLessonByCourse } from '@/main/factories/usecases/lesson'
import { makeLogControllerDecorator } from '../../decorators'

export const makeGetAllLessonByCourseController = (): Controller => {
  const requiredFields = ['courseId', 'skip', 'take']
  const getAllLessonByCourseController = new GetAllLessonByCourseController(makeValidations(requiredFields), makeGetAllLessonByCourse())
  return makeLogControllerDecorator(getAllLessonByCourseController)
}
