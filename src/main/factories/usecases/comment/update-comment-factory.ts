import { UpdateComment } from '@/data/usecases/comment'
import { UpdateCommentRepository } from '@/infra/db/repositories/comment'
import { IUpdateComment } from '@/domain/usecases/comment'

export const makeUpdateComment = (): IUpdateComment => {
  const updateCommentRepository = new UpdateCommentRepository()
  return new UpdateComment(updateCommentRepository)
}
