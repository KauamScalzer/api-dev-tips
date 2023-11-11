import { GetAllCourseResult } from '@/domain/usecases/course'
import { IGetAllCourseRepository } from '@/data/protocols/course'
import { Course } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class GetAllCourseRepository implements IGetAllCourseRepository {
  async getAll (): Promise<GetAllCourseResult> {
    const repository = getRepository(Course)
    const result = await repository.find()
    return result
  }
}
