import { HttpRequest, HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http'
import { IDeleteUser } from '@/domain/usecases/user'

export class DeleteUserController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly deleteUser: IDeleteUser
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }
      const params = httpRequest.params
      await this.deleteUser.delete(params.id)
      return noContent()
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
