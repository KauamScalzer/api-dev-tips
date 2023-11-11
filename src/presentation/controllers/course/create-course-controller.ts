import { badRequest } from '@/presentation/helpers/http'
import { HttpRequest, HttpResponse, Controller, Validation } from '@/presentation/protocols'

export class CreateCourseController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    return null
  }
}
