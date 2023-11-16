import { ICreateComment, CreateCommentModel } from '@/domain/usecases/comment'
import { ICreateCommentRepository } from '@/data/protocols/comment'

export class CreateComment implements ICreateComment {
  constructor (
    private readonly createCommentRepository: ICreateCommentRepository
  ) {}

  async create (data: CreateCommentModel): Promise<void> {
    await this.createCommentRepository.create(data)
  }
}
