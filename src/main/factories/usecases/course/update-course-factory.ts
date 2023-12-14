import { UpdateCourse } from '@/data/usecases/course'
import { UpdateCourseRepository } from '@/infra/db/repositories/course'
import { IUpdateCourse } from '@/domain/usecases/course'

export const makeUpdateCourse = (): IUpdateCourse => {
  const updateCourseRepository = new UpdateCourseRepository()
  return new UpdateCourse(updateCourseRepository)
}
