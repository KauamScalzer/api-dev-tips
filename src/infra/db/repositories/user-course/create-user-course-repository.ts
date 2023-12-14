import { ICreateUserCourseRepository } from '@/data/protocols/db/user-course'
import { UserCourse } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class CreateUserCourseRepository implements ICreateUserCourseRepository {
  async create (data: ICreateUserCourseRepository.Params): Promise<void> {
    const repository = getRepository(UserCourse)
    await repository.save(data)
  }
}
