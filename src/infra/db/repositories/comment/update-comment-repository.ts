import { IUpdateCommentRepository } from '@/data/protocols/db/comment'
import { Comment } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class UpdateCommentRepository implements IUpdateCommentRepository {
  async update (data: IUpdateCommentRepository.Params): Promise<void> {
    const repository = getRepository(Comment)
    await repository.update(data.id, {
      comment: data.comment
    })
  }
}
