import { ICreateCourseRepository } from '@/data/protocols/db/course'
import { Course } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class CreateCourseRepository implements ICreateCourseRepository {
  async create (data: ICreateCourseRepository.Params): Promise<void> {
    const repository = getRepository(Course)
    await repository.save(data)
  }
}
