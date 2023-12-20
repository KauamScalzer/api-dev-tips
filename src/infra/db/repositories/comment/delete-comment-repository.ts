import { IDeleteCommentRepository } from '@/data/protocols/db/comment'
import { Comment } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class DeleteCommentRepository implements IDeleteCommentRepository {
  async delete (data: number): Promise<void> {
    const repository = getRepository(Comment)
    await repository.delete(data)
  }
}
