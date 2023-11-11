import { GetAllCourseResult } from '@/domain/usecases/course'

export interface IGetAllCourseRepository {
  getAll (): Promise<GetAllCourseResult>
}
