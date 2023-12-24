import { IGetAllLessonByCourseRepository } from '@/data/protocols/db/lesson'
import { Lesson } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class GetAllLessonByCourseRepository implements IGetAllLessonByCourseRepository {
  async getAll (params: IGetAllLessonByCourseRepository.Params): Promise<IGetAllLessonByCourseRepository.Result> {
    const repository = getRepository(Lesson)
    const [result, count] = await repository.findAndCount({
      where: {
        courseId: params.courseId
      },
      order: {
        id: 'ASC'
      },
      take: params.take,
      skip: params.skip
    })
    return { result, count }
  }
}
