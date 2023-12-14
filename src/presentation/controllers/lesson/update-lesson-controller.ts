import { HttpRequest, HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http'
import { IUpdateLesson } from '@/domain/usecases/lesson'

export class UpdateLessonController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateLesson: IUpdateLesson
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate({ ...httpRequest.body, ...httpRequest.params })
      if (error) {
        return badRequest(error)
      }
      const { id } = httpRequest.params
      const { courseId, name, description, urlVideo } = httpRequest.body
      await this.updateLesson.update({
        id,
        courseId,
        name,
        description,
        urlVideo
      })
      return noContent()
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
