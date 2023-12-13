import { UpdateCourseModel, IUpdateCourse } from '@/domain/usecases/course'
import { IUpdateCourseRepository } from '@/data/protocols/db/course'

export class UpdateCourse implements IUpdateCourse {
  constructor (
    private readonly updateCourseRepository: IUpdateCourseRepository
  ) {}

  async update (data: UpdateCourseModel): Promise<void> {
    await this.updateCourseRepository.update(data.id, data)
  }
}
