import { HttpRequest, HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http'
import { IUpdateComment } from '@/domain/usecases/comment'

export class UpdateCommentController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateComment: IUpdateComment
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate({ ...httpRequest.params, ...httpRequest.body })
      if (error) {
        return badRequest(error)
      }
      const { id } = httpRequest.params
      const { comment } = httpRequest.body
      await this.updateComment.update({
        id,
        comment
      })
      return noContent()
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
