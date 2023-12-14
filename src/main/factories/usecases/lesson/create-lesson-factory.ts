import { CreateLesson } from '@/data/usecases/lesson'
import { CreateLessonRepository } from '@/infra/db/repositories/lesson'
import { ICreateLesson } from '@/domain/usecases/lesson'

export const makeCreateLesson = (): ICreateLesson => {
  const createLessonRepository = new CreateLessonRepository()
  return new CreateLesson(createLessonRepository)
}
