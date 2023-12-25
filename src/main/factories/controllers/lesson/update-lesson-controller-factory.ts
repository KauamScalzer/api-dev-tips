import { UpdateLessonController } from '@/presentation/controllers/lesson'
import { Controller } from '@/presentation/protocols'
import { NotExistFieldValitation, makeValidations } from '@/main/factories/validations'
import { makeUpdateLesson } from '@/main/factories/usecases/lesson'
import { makeLogControllerDecorator } from '../../decorators'
import { Course, Lesson } from '@/infra/db/typeorm/models'

export const makeUpdateLessonController = (): Controller => {
  const requiredFields = ['id', 'courseId', 'name', 'description', 'urlVideo']
  const notExistFieldValitation: NotExistFieldValitation[] = [{
    field: 'courseId',
    model: Course
  },
  {
    field: 'id',
    model: Lesson
  }]
  const updateLessonController = new UpdateLessonController(makeValidations(requiredFields, null, null, null, notExistFieldValitation), makeUpdateLesson())
  return makeLogControllerDecorator(updateLessonController)
}
