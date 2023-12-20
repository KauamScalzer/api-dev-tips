import { IGetAllCommentsByLessonRepository } from '@/data/protocols/db/comment'
import { Lesson } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class GetAllCommentsByLessonRepository implements IGetAllCommentsByLessonRepository {
  async getAll (params: IGetAllCommentsByLessonRepository.Params): Promise<any> {
    const repository = getRepository(Lesson)
    const [data, count] = await repository.findAndCount({
      where: {
        userId: params.lessonId
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
