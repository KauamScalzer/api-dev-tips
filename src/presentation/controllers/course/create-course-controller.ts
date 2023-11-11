import { ICreateCourse } from '@/domain/usecases/course'
import { badRequest } from '@/presentation/helpers/http'
import { HttpRequest, HttpResponse, Controller, Validation } from '@/presentation/protocols'

export class CreateCourseController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly createCourse: ICreateCourse
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    const { name, description, thumb, author } = httpRequest.body
    await this.createCourse.create({
      name,
      description,
      thumb,
      author
    })
    return null
  }
}
