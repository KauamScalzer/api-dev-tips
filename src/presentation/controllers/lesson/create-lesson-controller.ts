import { HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http'
import { ICreateLesson } from '@/domain/usecases/lesson'

export class CreateLessonController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly createLesson: ICreateLesson
  ) {}

  async handle (httpRequest: CreateLessonController.Params): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest)
      if (error) {
        return badRequest(error)
      }
      await this.createLesson.create({
        courseId: httpRequest.courseId,
        name: httpRequest.name,
        description: httpRequest.description,
        urlVideo: httpRequest.urlVideo
      })
      return noContent()
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}

export namespace CreateLessonController {
  export type Params = {
    courseId: number
    name: string
    description: string
    urlVideo: string
  }
}
