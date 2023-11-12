import { ICreateUserCourses, CreateUserCoursesParams } from '@/domain/usecases/user-course'
import { ICreateUserCourseRepository } from '@/data/protocols/user-course'

export class CreateUserCourses implements ICreateUserCourses {
  constructor (
    private readonly createUserCourseRepository: ICreateUserCourseRepository
  ) {}

  async create (data: CreateUserCoursesParams): Promise<void> {
    for (const item of data.courseIds) {
      await this.createUserCourseRepository.create({
        userId: data.userId,
        courseId: item.id
      })
    }
  }
}
