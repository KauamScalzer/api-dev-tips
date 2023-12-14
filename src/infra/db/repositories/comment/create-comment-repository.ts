import { ICreateCommentRepository } from '@/data/protocols/db/comment'
import { Comment } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class CreateCommentRepository implements ICreateCommentRepository {
  async create (data: ICreateCommentRepository.Params): Promise<void> {
    const repository = getRepository(Comment)
    await repository.save(data)
  }
}
