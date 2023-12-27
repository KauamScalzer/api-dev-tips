import { ICreateLesson } from '@/domain/usecases/lesson'
import { ICreateLessonRepository } from '@/data/protocols/db/lesson'

export class CreateLesson implements ICreateLesson {
  constructor (
    private readonly createLessonepository: ICreateLessonRepository
  ) {}

  async create (data: ICreateLesson.Params): Promise<ICreateLesson.Result> {
    return await this.createLessonepository.create(data)
  }
}
