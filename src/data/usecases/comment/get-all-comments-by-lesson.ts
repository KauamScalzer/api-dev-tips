import { IGetAllCommentsByLesson } from '@/domain/usecases/comment'
import { IGetAllCommentsByLessonRepository } from '@/data/protocols/db/comment'

export class GetAllCommentsByLesson implements IGetAllCommentsByLesson {
  constructor (
    private readonly getAllCommentsByLessonRepository: IGetAllCommentsByLessonRepository
  ) {}

  async getAll (data: IGetAllCommentsByLesson.Params): Promise<IGetAllCommentsByLesson.Result> {
    data.skip = (data.skip - 1) * data.take
    return await this.getAllCommentsByLessonRepository.getAll(data)
  }
}
