import { HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { returnErrorDecider, serverError, noContent } from '@/presentation/helpers'
import { IDeleteCourse } from '@/domain/usecases/course'

export class DeleteCourseController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly deleteCourse: IDeleteCourse
  ) {}

  async handle (httpRequest: DeleteCourseController.Params): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest)
      if (error) {
        return returnErrorDecider(error)
      }
      await this.deleteCourse.delete({
        id: httpRequest.id
      })
      return noContent()
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}

export namespace DeleteCourseController {
  export type Params = {
    id: number
  }
}
