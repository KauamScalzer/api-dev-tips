import { CreateCourse } from '@/data/usecases/course'
import { CreateCourseRepository } from '@/infra/db/repositories/course'
import { ICreateCourse } from '@/domain/usecases/course'

export const makeCreateCourse = (): ICreateCourse => {
  const createCourseRepository = new CreateCourseRepository()
  return new CreateCourse(createCourseRepository)
}
