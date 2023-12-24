import { HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { returnErrorDecider, serverError, noContent } from '@/presentation/helpers/http'
import { ICreateComment } from '@/domain/usecases/comment'

export class CreateCommentController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly createComment: ICreateComment
  ) {}

  async handle (httpRequest: CreateCommentController.Params): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest)
      if (error) {
        return returnErrorDecider(error)
      }
      await this.createComment.create({
        lessonId: httpRequest.lessonId,
        userId: httpRequest.userId,
        comment: httpRequest.comment
      })
      return noContent()
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}

export namespace CreateCommentController {
  export type Params = {
    lessonId: number
    userId: number
    comment: string
  }
}
