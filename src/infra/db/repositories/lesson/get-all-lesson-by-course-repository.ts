import { IGetAllLessonByCourseRepository } from '@/data/protocols/db/lesson'
import { Lesson } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class GetAllLessonByCourseRepository implements IGetAllLessonByCourseRepository {
  async getAll (id: number, params: IGetAllLessonByCourseRepository.Params): Promise<IGetAllLessonByCourseRepository.Result> {
    const repository = getRepository(Lesson)
    const [data, count] = await repository.findAndCount({
      where: {
        courseId: id
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
