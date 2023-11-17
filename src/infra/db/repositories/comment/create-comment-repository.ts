import { ICreateCommentRepository, CreateCommentParams } from '@/data/protocols/comment'
import { Comment } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class CreateCommentRepository implements ICreateCommentRepository {
  async create (data: CreateCommentParams): Promise<void> {
    const repository = getRepository(Comment)
    await repository.save(data)
  }
}
