import { ICreateCourseParams } from '@/domain/usecases/course'

export interface ICreateCourseRepository {
  create (data: ICreateCourseParams): Promise<void>
}
