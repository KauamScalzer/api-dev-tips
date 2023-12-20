import { DeleteComment } from '@/data/usecases/comment'
import { DeleteCommentRepository } from '@/infra/db/repositories/comment'
import { IDeleteComment } from '@/domain/usecases/comment'

export const makeDeleteComment = (): IDeleteComment => {
  const deleteCommentRepository = new DeleteCommentRepository()
  return new DeleteComment(deleteCommentRepository)
}
