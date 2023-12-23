import { IDeleteLessonRepository } from '@/data/protocols/db/lesson'
import { Lesson } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class DeleteLessonRepository implements IDeleteLessonRepository {
  async delete (data: number): Promise<void> {
    const repository = getRepository(Lesson)
    await repository.delete(data)
  }
}
