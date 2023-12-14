import { HttpRequest, HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http'
import { ICreateComment } from '@/domain/usecases/comment'

export class CreateCommentController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly createComment: ICreateComment
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { userId, comment, lessonId } = httpRequest.body
      await this.createComment.create({
        lessonId,
        userId,
        comment
      })
      return noContent()
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
