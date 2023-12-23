import { HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http'
import { IDeleteUser } from '@/domain/usecases/user'

export class DeleteUserController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly deleteUser: IDeleteUser
  ) {}

  async handle (httpRequest: DeleteUserController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest)
      if (error) {
        return badRequest(error)
      }
      await this.deleteUser.delete(httpRequest.id)
      return noContent()
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}

export namespace DeleteUserController {
  export type Params = {
    id: number
  }
}
