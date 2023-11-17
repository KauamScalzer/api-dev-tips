import { IGetAllCourse, GetAllCourseResult, GetAllCourseParams } from '@/domain/usecases/course'
import { IGetAllCourseRepository } from '@/data/protocols/course'

export class GetAllCourse implements IGetAllCourse {
  constructor (
    private readonly getAllCourseRepository: IGetAllCourseRepository
  ) {}

  async getAll (data: GetAllCourseParams): Promise<GetAllCourseResult> {
    data.skip = (data.skip - 1) * data.take
    return await this.getAllCourseRepository.getAll(data)
  }
}
