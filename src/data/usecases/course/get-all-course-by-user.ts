import { IGetAllCourseByUser } from '@/domain/usecases/course'
import { IGetAllCourseByUserRepository } from '@/data/protocols/course'

export class GetAllCourseByUser implements IGetAllCourseByUser {
  constructor (
    private readonly getAllCourseByUserRepository: IGetAllCourseByUserRepository
  ) {}

  async getAll (data: IGetAllCourseByUser.Params): Promise<any> {
    data.skip = (data.skip - 1) * data.take
    return await this.getAllCourseByUserRepository.getAll(data)
  }
}
