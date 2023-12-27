import { HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { returnErrorDecider, serverError, noContent } from '@/presentation/helpers'
import { IUpdateCourse } from '@/domain/usecases/course'

export class UpdateCourseController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateCourse: IUpdateCourse
  ) {}

  async handle (httpRequest: UpdateCourseController.Params): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest)
      if (error) {
        return returnErrorDecider(error)
      }
      await this.updateCourse.update({
        id: httpRequest.id,
        name: httpRequest.name,
        description: httpRequest.description,
        author: httpRequest.author,
        thumb: httpRequest.thumb
      })
      return noContent()
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}

export namespace UpdateCourseController {
  export type Params = {
    id: number
    name: string
    description: string
    author: string
    thumb: string
  }
}
