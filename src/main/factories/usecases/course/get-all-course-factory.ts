import { GetAllCourse } from '@/data/usecases/course'
import { GetAllCourseRepository } from '@/infra/db/repositories/course'
import { IGetAllCourse } from '@/domain/usecases/course'

export const makeGetAllCourse = (): IGetAllCourse => {
  const getAllCourseRepository = new GetAllCourseRepository()
  return new GetAllCourse(getAllCourseRepository)
}
