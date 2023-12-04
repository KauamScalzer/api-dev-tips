import { HttpRequest, HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http'
import { IDeleteCourse } from '@/domain/usecases/course'

export class DeleteCourseController implements Controller {
  constructor (
    private readonly deleteCourse: IDeleteCourse,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }
      const { params } = httpRequest.params
      await this.deleteCourse.delete(params.id)
      return noContent()
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
