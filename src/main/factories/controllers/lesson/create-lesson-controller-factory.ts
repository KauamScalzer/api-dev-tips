import { CreateLessonController } from '@/presentation/controllers/lesson'
import { Controller } from '@/presentation/protocols'
import { NotExistFieldValitation, makeValidations } from '@/main/factories/validations'
import { makeCreateLesson } from '@/main/factories/usecases/lesson'
import { makeLogControllerDecorator } from '../../decorators'
import { Course } from '@/infra/db/typeorm/models'

export const makeCreateLessonController = (): Controller => {
  const requiredFields = ['courseId', 'name', 'description', 'urlVideo']
  const notExistFieldValitation: NotExistFieldValitation[] = [{
    field: 'courseId',
    model: Course
  }]
  const createLessonController = new CreateLessonController(makeValidations(requiredFields, null, null, null, notExistFieldValitation), makeCreateLesson())
  return makeLogControllerDecorator(createLessonController)
}
