import { IGetAllCourseByUser } from '@/domain/usecases/course'
import { badRequest, ok, serverError } from '@/presentation/helpers/http'
import { HttpResponse, Controller, HttpRequest, Validation } from '@/presentation/protocols'

export class GetAllCourseByUserController implements Controller {
  constructor (
    private readonly getAllCourseByUser: IGetAllCourseByUser,
    private readonly validation: Validation
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.query)
      if (error) {
        return badRequest(error)
      }
      const { id } = request.params
      const { take, skip } = request.query
      const courses = await this.getAllCourseByUser.getAll({
        id,
        take,
        skip
      })
      return ok(courses)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
