import { CreateCourseParams } from '@/domain/usecases/course'

export interface ICreateCourseRepository {
  create (data: CreateCourseParams): Promise<void>
}
