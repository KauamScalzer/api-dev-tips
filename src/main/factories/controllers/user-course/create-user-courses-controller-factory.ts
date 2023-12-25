import { CreateUserCoursesController } from '@/presentation/controllers/user-course'
import { Controller } from '@/presentation/protocols'
import { NotExistFieldValitation, makeValidations } from '@/main/factories/validations'
import { makeCreateUserCourses } from '@/main/factories/usecases/user-course'
import { makeLogControllerDecorator } from '../../decorators'
import { User } from '@/infra/db/typeorm/models'

export const makeCreateUserCoursesController = (): Controller => {
  const requiredFields = ['userId', 'courseIds']
  const notExistFieldValitation: NotExistFieldValitation[] = [{
    field: 'userId',
    model: User
  }]
  const createUserCoursesController = new CreateUserCoursesController(makeValidations(requiredFields, null, null, null, notExistFieldValitation), makeCreateUserCourses())
  return makeLogControllerDecorator(createUserCoursesController)
}
