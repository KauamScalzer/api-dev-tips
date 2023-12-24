import { HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { badRequest, serverError, ok } from '@/presentation/helpers/http'
import { IGetAllLessonByCourse } from '@/domain/usecases/lesson'

export class GetAllLessonByCourseController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly getAllLessonByCourse: IGetAllLessonByCourse
  ) {}

  async handle (httpRequest: GetAllLessonByCourseController.Params): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest)
      if (error) {
        return badRequest(error)
      }
      const result = await this.getAllLessonByCourse.getAll({
        courseId: httpRequest.courseId,
        skip: httpRequest.skip,
        take: httpRequest.take
      })
      return ok(result)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}

export namespace GetAllLessonByCourseController {
  export type Params = {
    courseId: number
    skip: number
    take: number
  }
}
