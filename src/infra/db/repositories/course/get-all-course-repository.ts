import { IGetAllCourseRepository } from '@/data/protocols/db/course'
import { Course } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class GetAllCourseRepository implements IGetAllCourseRepository {
  async getAll (params: IGetAllCourseRepository.Params): Promise<IGetAllCourseRepository.Result> {
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
