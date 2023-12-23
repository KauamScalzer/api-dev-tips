import { HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http'
import { IUpdateComment } from '@/domain/usecases/comment'

export class UpdateCommentController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateComment: IUpdateComment
  ) {}

  async handle (httpRequest: UpdateCommentController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest)
      if (error) {
        return badRequest(error)
      }
      await this.updateComment.update({
        id: httpRequest.id,
        comment: httpRequest.comment
      })
      return noContent()
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}

export namespace UpdateCommentController {
  export type Params = {
    id: number
    comment: string
  }
}
