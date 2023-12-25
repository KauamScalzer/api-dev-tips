import { IGetAllCourseByUser } from '@/domain/usecases/course'
import { IGetAllUserCourseByUserRepository } from '@/data/protocols/db/user-course'
import { IGetOneCourseRepository } from '@/data/protocols/db/course'

export class GetAllCourseByUser implements IGetAllCourseByUser {
  constructor (
    private readonly getAllUserCourseByUserRepository: IGetAllUserCourseByUserRepository,
    private readonly getOneCourseRepository: IGetOneCourseRepository
  ) {}

  async getAll (data: IGetAllCourseByUser.Params): Promise<IGetAllCourseByUser.Result> {
    const result = []
    data.skip = (data.skip - 1) * data.take
    const courses = await this.getAllUserCourseByUserRepository.getAll(data)
    for (const item of courses.result) {
      const course = await this.getOneCourseRepository.getOne(item.courseId)
      result.push(course)
    }
    return {
      result,
      count: result.length
    }
  }
}
