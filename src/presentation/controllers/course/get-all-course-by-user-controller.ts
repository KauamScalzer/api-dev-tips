import { IGetAllCourseByUser } from '@/domain/usecases/course'
import { badRequest, ok, serverError } from '@/presentation/helpers/http'
import { HttpResponse, Controller, Validation } from '@/presentation/protocols'

export class GetAllCourseByUserController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly getAllCourseByUser: IGetAllCourseByUser
  ) {}

  async handle (httpRequest: GetAllCourseByUserController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest)
      if (error) {
        return badRequest(error)
      }
      const courses = await this.getAllCourseByUser.getAll({
        userId: httpRequest.userId,
        take: httpRequest.take,
        skip: httpRequest.skip
      })
      return ok(courses)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}

export namespace GetAllCourseByUserController {
  export type Params = {
    userId: number
    take: number
    skip: number
  }
}
