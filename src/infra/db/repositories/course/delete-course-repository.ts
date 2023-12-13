import { IDeleteCourseRepository } from '@/data/protocols/db/course'
import { Course } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class DeleteCourseRepository implements IDeleteCourseRepository {
  async delete (data: number): Promise<void> {
    const repository = getRepository(Course)
    await repository.delete(data)
  }
}
