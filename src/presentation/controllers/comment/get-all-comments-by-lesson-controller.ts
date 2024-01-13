import { HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { returnErrorDecider, ok, serverError } from '@/presentation/helpers'
import { IGetAllCommentsByLesson } from '@/domain/usecases/comment'

export class GetAllCommentsByLessonController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly getAllCommentsByLesson: IGetAllCommentsByLesson
  ) {}

  async handle (httpRequest: GetAllCommentsByLessonController.Params): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest)
      if (error) {
        return returnErrorDecider(error)
      }
      const result = await this.getAllCommentsByLesson.getAll({
        lessonId: httpRequest.lessonId,
        skip: httpRequest.skip,
        take: httpRequest.take
      })
      return ok(result)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}

export namespace GetAllCommentsByLessonController {
  export type Params = {
    lessonId: number
    skip: number
    take: number
  }
}
