import { HttpRequest, HttpResponse, Controller, Validation } from '@/presentation/protocols'

export class CreateCourseController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return null
  }
}