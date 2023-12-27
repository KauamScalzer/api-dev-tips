import { ICreateCourseRepository } from '@/data/protocols/db/course'
import { Course } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class CreateCourseRepository implements ICreateCourseRepository {
  async create (data: ICreateCourseRepository.Params): Promise<ICreateCourseRepository.Result> {
    const repository = getRepository(Course)
    return await repository.save(data)
  }
}
