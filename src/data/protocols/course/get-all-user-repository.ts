import { GetAllCourseResult } from '@/domain/usecases/course'

export interface IGetAllCourseRepository {
  getAll (data: GetAllCourseRepositoryParams): Promise<GetAllCourseResult>
}

export interface GetAllCourseRepositoryParams {
  skip: number
  take: number
}
