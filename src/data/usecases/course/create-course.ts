import { ICreateCourse } from '@/domain/usecases/course'
import { ICreateCourseRepository } from '@/data/protocols/db/course'

export class CreateCourse implements ICreateCourse {
  constructor (
    private readonly createCourseRepository: ICreateCourseRepository
  ) {}

  async create (data: ICreateCourse.Params): Promise<ICreateCourse.Result> {
    return await this.createCourseRepository.create(data)
  }
}
