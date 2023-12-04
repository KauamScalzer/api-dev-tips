import { IGetAllUserCourseByUserRepository } from '@/data/protocols/user-course'
import { UserCourse } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class GetAllUserCourseByUserRepository implements IGetAllUserCourseByUserRepository {
  async getAll (params: IGetAllUserCourseByUserRepository.Params): Promise<any> {
    const repository = getRepository(UserCourse)
    const [data, count] = await repository.findAndCount({
      where: {
        userId: params.userId
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
