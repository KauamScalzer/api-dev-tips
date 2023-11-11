import { IGetAllCourse, GetAllCourseResult } from '@/domain/usecases/course'
import { IGetAllCourseRepository } from '@/data/protocols/course'

export class GetAllCourse implements IGetAllCourse {
  constructor (
    private readonly getAllCourseRepository: IGetAllCourseRepository
  ) {}

  async getAll (): Promise<GetAllCourseResult> {
    return await this.getAllCourseRepository.getAll()
  }
}
