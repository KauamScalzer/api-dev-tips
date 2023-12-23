import { HttpRequest, HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { badRequest, serverError, ok } from '@/presentation/helpers/http'
import { IGetAllLessonByCourse } from '@/domain/usecases/lesson'

export class GetAllLessonByCourseController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly getAllLessonByCourse: IGetAllLessonByCourse
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate({ ...httpRequest.params, ...httpRequest.query })
      if (error) {
        return badRequest(error)
      }
      const { courseId } = httpRequest.params
      const { skip, take } = httpRequest.query
      const result = await this.getAllLessonByCourse.getAll({
        courseId,
        skip,
        take
      })
      return ok(result)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
