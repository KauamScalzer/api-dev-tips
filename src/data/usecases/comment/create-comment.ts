import { ICreateComment } from '@/domain/usecases/comment'
import { ICreateCommentRepository } from '@/data/protocols/db/comment'

export class CreateComment implements ICreateComment {
  constructor (
    private readonly createCommentRepository: ICreateCommentRepository
  ) {}

  async create (data: ICreateComment.Params): Promise<ICreateComment.Result> {
    return await this.createCommentRepository.create(data)
  }
}
