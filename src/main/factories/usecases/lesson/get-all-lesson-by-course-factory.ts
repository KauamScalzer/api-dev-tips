import { GetAllLessonByCourse } from '@/data/usecases/lesson'
import { GetAllLessonByCourseRepository } from '@/infra/db/repositories/lesson'
import { IGetAllLessonByCourse } from '@/domain/usecases/lesson'

export const makeGetAllLessonByCourse = (): IGetAllLessonByCourse => {
  const getAllLessonByCourseRepository = new GetAllLessonByCourseRepository()
  return new GetAllLessonByCourse(getAllLessonByCourseRepository)
}
