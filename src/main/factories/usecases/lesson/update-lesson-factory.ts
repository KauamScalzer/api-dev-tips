import { UpdateLesson } from '@/data/usecases/lesson'
import { UpdateLessonRepository } from '@/infra/db/repositories/lesson'
import { IUpdateLesson } from '@/domain/usecases/lesson'

export const makeUpdateLesson = (): IUpdateLesson => {
  const updateLessonRepository = new UpdateLessonRepository()
  return new UpdateLesson(updateLessonRepository)
}
