import { ICreateUserCourses } from '@/domain/usecases/user-course'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http'
import { HttpRequest, HttpResponse, Controller, Validation } from '@/presentation/protocols'

export class CreateUserCoursesController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly createUserCourses: ICreateUserCourses
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { userId, courseIds } = httpRequest.body
      await this.createUserCourses.create({
        userId,
        courseIds
      })
      return noContent()
    } catch (error: any) {
      return serverError(error)
    }
  }
}
