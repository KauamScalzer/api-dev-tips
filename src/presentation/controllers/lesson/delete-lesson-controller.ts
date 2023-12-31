import { HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { returnErrorDecider, serverError, noContent } from '@/presentation/helpers'
import { IDeleteLesson } from '@/domain/usecases/lesson'

export class DeleteLessonController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly deleteLesson: IDeleteLesson
  ) {}

  async handle (httpRequest: DeleteLessonController.Params): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest)
      if (error) {
        return returnErrorDecider(error)
      }
      await this.deleteLesson.delete({
        id: httpRequest.id
      })
      return noContent()
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}

export namespace DeleteLessonController {
  export type Params = {
    id: number
  }
}
