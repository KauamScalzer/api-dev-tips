import { IDeleteCourse } from '@/domain/usecases/course'
import { IDeleteCourseRepository } from '@/data/protocols/db/course'

export class DeleteCourse implements IDeleteCourse {
  constructor (
    private readonly deleteCourseRepository: IDeleteCourseRepository
  ) {}

  async delete (data: IDeleteCourse.Params): Promise<void> {
    await this.deleteCourseRepository.delete(data.id)
  }
}
