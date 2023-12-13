import { IGetOneCourseRepository } from '@/data/protocols/course'
import { Course } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class GetOneCourseRepository implements IGetOneCourseRepository {
  async getOne (data: number): Promise<any> {
    const repository = getRepository(Course)
    const result = await repository.findOne({ where: { id: data } })
    return result
  }
}
