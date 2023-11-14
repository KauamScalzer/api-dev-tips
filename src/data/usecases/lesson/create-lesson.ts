import { ICreateLesson, CreateLessonModel } from '@/domain/usecases/lesson'
import { ICreateLessonRepository } from '@/data/protocols/lesson'

export class CreateLesson implements ICreateLesson {
  constructor (
    private readonly createLessonepository: ICreateLessonRepository
  ) {}

  async create (data: CreateLessonModel): Promise<void> {
    await this.createLessonepository.create(data)
  }
}
