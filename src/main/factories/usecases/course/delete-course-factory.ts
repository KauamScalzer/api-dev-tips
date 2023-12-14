import { DeleteCourse } from '@/data/usecases/course'
import { IDeleteCourse } from '@/domain/usecases/course'
import { DeleteCourseRepository } from '@/infra/db/repositories/course'

export const makeDeleteCourse = (): IDeleteCourse => {
  const deleteCourseRepository = new DeleteCourseRepository()
  return new DeleteCourse(deleteCourseRepository)
}
