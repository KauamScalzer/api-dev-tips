import { CreateLessonParams, ICreateLessonRepository } from '@/data/protocols/lesson'
import { Lesson } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class CreateLessonRepository implements ICreateLessonRepository {
  async create (data: CreateLessonParams): Promise<void> {
    const repository = getRepository(Lesson)
    await repository.save(data)
  }
}
