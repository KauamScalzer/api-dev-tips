import { HttpRequest, HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http'
import { ICreateLesson } from '@/domain/usecases/lesson'

export class CreateLessonController implements Controller {
  constructor (
    private readonly createLesson: ICreateLesson,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { courseId, name, description, urlVideo } = httpRequest.body
      await this.createLesson.create({
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
