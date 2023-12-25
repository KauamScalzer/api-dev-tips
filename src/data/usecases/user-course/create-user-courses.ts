import { ICreateUserCourses } from '@/domain/usecases/user-course'
import { ICreateUserCourseRepository } from '@/data/protocols/db/user-course'

export class CreateUserCourses implements ICreateUserCourses {
  constructor (
    private readonly createUserCourseRepository: ICreateUserCourseRepository
  ) {}

  async create (data: ICreateUserCourses.Params): Promise<void> {
    for (const item of data.courseIds) {
      await this.createUserCourseRepository.create({
        userId: data.userId,
        courseId: item.id
      })
    }
  }
}
