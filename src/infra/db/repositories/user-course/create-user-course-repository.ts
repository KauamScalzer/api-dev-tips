import { ICreateUserCourseRepository, CreateUserCourseParams } from '@/data/protocols/user-course'
import { UserCourse } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class CreateUserCourseRepository implements ICreateUserCourseRepository {
  async create (data: CreateUserCourseParams): Promise<void> {
    const repository = getRepository(UserCourse)
    await repository.save(data)
  }
}
