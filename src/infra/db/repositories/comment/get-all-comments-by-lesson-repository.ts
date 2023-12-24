import { IGetAllCommentsByLessonRepository } from '@/data/protocols/db/comment'
import { Comment } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class GetAllCommentsByLessonRepository implements IGetAllCommentsByLessonRepository {
  async getAll (params: IGetAllCommentsByLessonRepository.Params): Promise<any> {
    const repository = getRepository(Comment)
    const [result, count] = await repository.findAndCount({
      where: {
        lessonId: params.lessonId
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
