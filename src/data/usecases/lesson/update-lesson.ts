import { IUpdateLesson } from '@/domain/usecases/lesson'
import { IUpdateLessonRepository } from '@/data/protocols/db/lesson'

export class UpdateLesson implements IUpdateLesson {
  constructor (
    private readonly updateLessonRepository: IUpdateLessonRepository
  ) {}

  async update (data: IUpdateLesson.Params): Promise<void> {
    await this.updateLessonRepository.update(data.id, data)
  }
}
