import { IUpdateCourseRepository, UpdateCourseParams } from '@/data/protocols/course'
import { Course } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class UpdateCourseRepository implements IUpdateCourseRepository {
  async update (id: number, data: UpdateCourseParams): Promise<void> {
    const entity = new Course()
    Object.assign(entity, data)
    const repository = getRepository(Course)
    await repository.update(id, entity)
  }
}
