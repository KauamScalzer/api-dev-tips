import { IGetAllCourse } from '@/domain/usecases/course'
import { badRequest, ok, serverError } from '@/presentation/helpers/http'
import { HttpResponse, Controller, HttpRequest, Validation } from '@/presentation/protocols'

export class GetAllCourseController implements Controller {
  constructor (
    private readonly getAllCourse: IGetAllCourse,
    private readonly validation: Validation
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.query)
      if (error) {
        return badRequest(error)
      }
      const { take, skip } = request.query
      const courses = await this.getAllCourse.getAll({
        take,
        skip
      })
      return ok(courses)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
