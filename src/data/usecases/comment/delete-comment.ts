import { IDeleteComment } from '@/domain/usecases/comment'
import { IDeleteCommentRepository } from '@/data/protocols/db/comment'

export class DeleteComment implements IDeleteComment {
  constructor (
    private readonly deleteCommentRepository: IDeleteCommentRepository
  ) {}

  async delete (data: IDeleteComment.Params): Promise<void> {
    await this.deleteCommentRepository.delete(data.id)
  }
}
