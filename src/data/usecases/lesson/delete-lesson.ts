import { IDeleteLesson } from '@/domain/usecases/lesson'
import { IDeleteLessonRepository } from '@/data/protocols/db/lesson'

export class DeleteLesson implements IDeleteLesson {
  constructor (
    private readonly deleteLessonRepository: IDeleteLessonRepository
  ) {}

  async delete (data: IDeleteLesson.Params): Promise<void> {
    await this.deleteLessonRepository.delete(data.id)
  }
}
