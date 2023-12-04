import { IGetAllCourseByUserRepository } from '@/data/protocols/course'
import { Course } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class GetAllCourseByUserRepository implements IGetAllCourseByUserRepository {
  async getAll (params: IGetAllCourseByUserRepository.Params): Promise<any> {
    const repository = getRepository(Course)
    const [data, count] = await repository.findAndCount({
      where: {
        id: params.userId
      },
      order: {
        id: 'ASC'
      },
      take: params.take,
      skip: params.skip
    })
    return { data, count }
  }
}
