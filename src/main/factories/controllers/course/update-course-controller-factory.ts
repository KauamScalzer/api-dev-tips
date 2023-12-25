import { UpdateCourseController } from '@/presentation/controllers/course'
import { Controller } from '@/presentation/protocols'
import { NotExistFieldValitation, makeValidations } from '@/main/factories/validations'
import { makeUpdateCourse } from '@/main/factories/usecases/course'
import { makeLogControllerDecorator } from '../../decorators'
import { Course } from '@/infra/db/typeorm/models'

export const makeUpdateCourseController = (): Controller => {
  const requiredFields = ['name', 'description', 'author', 'thumb', 'id']
  const notExistFieldValitation: NotExistFieldValitation[] = [{
    field: 'id',
    model: Course
  }]
  const updateCourseController = new UpdateCourseController(makeValidations(requiredFields, null, null, null, notExistFieldValitation), makeUpdateCourse())
  return makeLogControllerDecorator(updateCourseController)
}
