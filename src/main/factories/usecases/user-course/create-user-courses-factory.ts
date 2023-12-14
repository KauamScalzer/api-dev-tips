import { CreateUserCourses } from '@/data/usecases/user-course'
import { CreateUserCourseRepository } from '@/infra/db/repositories/user-course'
import { ICreateUserCourses } from '@/domain/usecases/user-course'

export const makeCreateUserCourses = (): ICreateUserCourses => {
  const createUserCourseRepository = new CreateUserCourseRepository()
  return new CreateUserCourses(createUserCourseRepository)
}
