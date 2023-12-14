import { GetAllCourseByUser } from '@/data/usecases/course'
import { GetAllUserCourseByUserRepository } from '@/infra/db/repositories/user-course'
import { GetOneCourseRepository } from '@/infra/db/repositories/course'
import { IGetAllCourseByUser } from '@/domain/usecases/course'

export const makeGetAllCourseByUser = (): IGetAllCourseByUser => {
  const getOneCourseRepository = new GetOneCourseRepository()
  const getAllUserCourseByUserRepository = new GetAllUserCourseByUserRepository()
  return new GetAllCourseByUser(getAllUserCourseByUserRepository, getOneCourseRepository)
}
