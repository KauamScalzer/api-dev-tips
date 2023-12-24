import { IUpdateComment } from '@/domain/usecases/comment'
import { IUpdateCommentRepository } from '@/data/protocols/db/comment'

export class UpdateComment implements IUpdateComment {
  constructor (
    private readonly updateCommentRepository: IUpdateCommentRepository
  ) {}

  async update (data: IUpdateComment.Params): Promise<void> {
    await this.updateCommentRepository.update(data)
  }
}
