import { GetAllLessonByCourseController } from '@/presentation/controllers/lesson'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeGetAllLessonByCourse } from '@/main/factories/usecases/lesson'
import { makeLogControllerDecorator } from '../../decorators'
import { makeGetAllLessonsRules } from '../../rules/lesson'

export const makeGetAllLessonByCourseController = (): Controller => {
  const getAllLessonByCourseController = new GetAllLessonByCourseController(makeValidations(makeGetAllLessonsRules()), makeGetAllLessonByCourse())
  return makeLogControllerDecorator(getAllLessonByCourseController)
}
