import { ICreateCourse } from '@/domain/usecases/course'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http'
import { HttpResponse, Controller, Validation } from '@/presentation/protocols'

export class CreateCourseController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly createCourse: ICreateCourse
  ) {}

  async handle (httpRequest: CreateCourseController.Params): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest)
      if (error) {
        return badRequest(error)
      }
      await this.createCourse.create({
        name: httpRequest.name,
        description: httpRequest.description,
        thumb: httpRequest.thumb,
        author: httpRequest.author
      })
      return noContent()
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace CreateCourseController {
  export type Params = {
    name: string
    description: string
    thumb: string
    author: string
  }
}
