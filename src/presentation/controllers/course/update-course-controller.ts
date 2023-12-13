import { HttpRequest, HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http'
import { IUpdateCourse } from '@/domain/usecases/course'

export class UpdateCourseController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateCourse: IUpdateCourse
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate({ ...httpRequest.body, ...httpRequest.params })
      if (error) {
        return badRequest(error)
      }
      const { name, description, author, thumb } = httpRequest.body
      const { id } = httpRequest.params
      await this.updateCourse.update({
        id,
        name,
        description,
        author,
        thumb
      })
      return noContent()
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
