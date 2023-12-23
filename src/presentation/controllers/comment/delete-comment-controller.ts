import { HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http'
import { IDeleteComment } from '@/domain/usecases/comment'

export class DeleteCommentController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly deleteComment: IDeleteComment
  ) {}

  async handle (httpRequest: DeleteCommentController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest)
      if (error) {
        return badRequest(error)
      }
      await this.deleteComment.delete({
        id: httpRequest.id
      })
      return noContent()
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}

export namespace DeleteCommentController {
  export type Params = {
    id: number
  }
}
