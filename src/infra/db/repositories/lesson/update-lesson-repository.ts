import { IUpdateLessonRepository } from '@/data/protocols/db/lesson'
import { Lesson } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class UpdateLessonRepository implements IUpdateLessonRepository {
  async update (id: number, data: IUpdateLessonRepository.Params): Promise<void> {
    const entity = new Lesson()
    Object.assign(entity, data)
    const repository = getRepository(Lesson)
    await repository.update(id, entity)
  }
}
