import { IGetAllCourse } from '@/domain/usecases/course'
import { ok, serverError } from '@/presentation/helpers/http'
import { HttpResponse, Controller } from '@/presentation/protocols'

export class GetAllCourseController implements Controller {
  constructor (
    private readonly getAllCourse: IGetAllCourse
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const courses = await this.getAllCourse.getAll()
      return ok(courses)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
