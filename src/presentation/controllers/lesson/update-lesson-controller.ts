import { HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http'
import { IUpdateLesson } from '@/domain/usecases/lesson'

export class UpdateLessonController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateLesson: IUpdateLesson
  ) {}

  async handle (httpRequest: UpdateLessonController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest)
      if (error) {
        return badRequest(error)
      }
      await this.updateLesson.update({
        id: httpRequest.id,
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

export namespace UpdateLessonController {
  export type Params = {
    id: number
    courseId: number
    name: string
    description: string
    urlVideo: string
  }
}
