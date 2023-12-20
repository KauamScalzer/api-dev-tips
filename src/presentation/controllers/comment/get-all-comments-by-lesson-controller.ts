import { HttpRequest, HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '@/presentation/helpers/http'
import { IGetAllCommentsByLesson } from '@/domain/usecases/comment'

export class GetAllCommentsByLessonController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly getAllCommentsByLesson: IGetAllCommentsByLesson
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate({ ...httpRequest.params, ...httpRequest.query })
      if (error) {
        return badRequest(error)
      }
      const { lessonId } = httpRequest.params
      const { skip, take } = httpRequest.query
      const result = await this.getAllCommentsByLesson.getAll({
        lessonId,
        skip,
        take
      })
      return ok(result)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
