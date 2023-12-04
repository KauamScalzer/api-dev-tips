import { IGetAllCourseByUser } from '@/domain/usecases/course'
import { IGetAllUserCourseByUserRepository } from '@/data/protocols/user-course'
import { IGetOneCourseRepository } from '@/data/protocols/course'

export class GetAllCourseByUser implements IGetAllCourseByUser {
  constructor (
    private readonly getAllUserCourseByUserRepository: IGetAllUserCourseByUserRepository,
    private readonly getOneCourseRepository: IGetOneCourseRepository
  ) {}

  async getAll (data: IGetAllCourseByUser.Params): Promise<any> {
    const result = []
    data.skip = (data.skip - 1) * data.take
    const courses = await this.getAllUserCourseByUserRepository.getAll(data)
    for (const item of courses.data) {
      const course = await this.getOneCourseRepository.getOne(item.courseId)
      result.push(course)
    }
    return {
      data: result,
      count: result.length
    }
  }
}
