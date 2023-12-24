import { IGetAllCourse } from '@/domain/usecases/course'
import { returnErrorDecider, ok, serverError } from '@/presentation/helpers/http'
import { HttpResponse, Controller, Validation } from '@/presentation/protocols'

export class GetAllCourseController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly getAllCourse: IGetAllCourse
  ) {}

  async handle (httpRequest: GetAllCourseController.Params): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest)
      if (error) {
        return returnErrorDecider(error)
      }
      const courses = await this.getAllCourse.getAll({
        take: httpRequest.take,
        skip: httpRequest.skip
      })
      return ok(courses)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace GetAllCourseController {
  export type Params = {
    take: number
    skip: number
  }
}
