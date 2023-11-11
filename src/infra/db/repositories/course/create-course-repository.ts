import { ICreateCourseRepository } from '@/data/protocols/course'
import { CreateCourseParams } from '@/domain/usecases/course'
import { Course } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class CreateCourseRepository implements ICreateCourseRepository {
  async create (data: CreateCourseParams): Promise<void> {
    const repository = getRepository(Course)
    await repository.save(data)
  }
}
