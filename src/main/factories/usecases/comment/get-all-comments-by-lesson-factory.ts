import { GetAllCommentsByLesson } from '@/data/usecases/comment'
import { GetAllCommentsByLessonRepository } from '@/infra/db/repositories/comment'
import { IGetAllCommentsByLesson } from '@/domain/usecases/comment'

export const makeGetAllCommentsByLesson = (): IGetAllCommentsByLesson => {
  const getAllCommentsByLessonRepository = new GetAllCommentsByLessonRepository()
  return new GetAllCommentsByLesson(getAllCommentsByLessonRepository)
}
