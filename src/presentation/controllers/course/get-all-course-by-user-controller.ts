import { IGetAllCourseByUser } from '@/domain/usecases/course'
import { badRequest, ok, serverError } from '@/presentation/helpers/http'
import { HttpResponse, Controller, HttpRequest, Validation } from '@/presentation/protocols'

export class GetAllCourseByUserController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly getAllCourseByUser: IGetAllCourseByUser
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate({ ...request.query, ...request.params })
      if (error) {
        return badRequest(error)
      }
      const { userId } = request.params
      const { take, skip } = request.query
      const courses = await this.getAllCourseByUser.getAll({
        userId,
        take,
        skip
      })
      return ok(courses)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
