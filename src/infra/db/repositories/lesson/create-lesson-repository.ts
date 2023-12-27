import { ICreateLessonRepository } from '@/data/protocols/db/lesson'
import { Lesson } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class CreateLessonRepository implements ICreateLessonRepository {
  async create (data: ICreateLessonRepository.Params): Promise<ICreateLessonRepository.Result> {
    const repository = getRepository(Lesson)
    return await repository.save(data)
  }
}
