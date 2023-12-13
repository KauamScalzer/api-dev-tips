import { GetAllCourseResult } from '@/domain/usecases/course'
import { GetAllCourseRepositoryParams, IGetAllCourseRepository } from '@/data/protocols/db/course'
import { Course } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class GetAllCourseRepository implements IGetAllCourseRepository {
  async getAll (params: GetAllCourseRepositoryParams): Promise<GetAllCourseResult> {
    const repository = getRepository(Course)
    const [data, count] = await repository.findAndCount({
      order: {
        id: 'ASC'
      },
      take: params.take,
      skip: params.skip
    })
    return { data, count }
  }
}
