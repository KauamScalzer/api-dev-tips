import { IGetAllCourse } from '@/domain/usecases/course'
import { IGetAllCourseRepository } from '@/data/protocols/db/course'

export class GetAllCourse implements IGetAllCourse {
  constructor (
    private readonly getAllCourseRepository: IGetAllCourseRepository
  ) {}

  async getAll (data: IGetAllCourse.Params): Promise<IGetAllCourse.Result> {
    data.skip = (data.skip - 1) * data.take
    return await this.getAllCourseRepository.getAll(data)
  }
}
