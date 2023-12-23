import { DeleteLesson } from '@/data/usecases/lesson'
import { DeleteLessonRepository } from '@/infra/db/repositories/lesson'
import { IDeleteLesson } from '@/domain/usecases/lesson'

export const makeDeleteLesson = (): IDeleteLesson => {
  const deleteLessonRepository = new DeleteLessonRepository()
  return new DeleteLesson(deleteLessonRepository)
}
