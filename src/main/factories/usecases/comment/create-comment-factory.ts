import { CreateComment } from '@/data/usecases/comment'
import { CreateCommentRepository } from '@/infra/db/repositories/comment'
import { ICreateComment } from '@/domain/usecases/comment'

export const makeCreateComment = (): ICreateComment => {
  const createCommentRepository = new CreateCommentRepository()
  return new CreateComment(createCommentRepository)
}
