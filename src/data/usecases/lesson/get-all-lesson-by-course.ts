import { IGetAllLessonByCourse } from '@/domain/usecases/lesson'
import { IGetAllLessonByCourseRepository } from '@/data/protocols/db/lesson'

export class GetAllLessonByCourse implements IGetAllLessonByCourse {
  constructor (
    private readonly getAllLessonByCourseRepository: IGetAllLessonByCourseRepository
  ) {}

  async getAll (data: IGetAllLessonByCourse.Params): Promise<any> {
    data.skip = (data.skip - 1) * data.take
    return await this.getAllLessonByCourseRepository.getAll(data)
  }
}
