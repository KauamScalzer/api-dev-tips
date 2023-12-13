import { HttpRequest, HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http'
import { IUpdateUser } from '@/domain/usecases/user'

export class UpdateUserController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateUser: IUpdateUser
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate({ ...httpRequest.body, ...httpRequest.params })
      if (error) {
        return badRequest(error)
      }
      const { name, email, urlImage } = httpRequest.body
      const { id } = httpRequest.params
      await this.updateUser.update({
        id,
        name,
        email,
        urlImage
      })
      return noContent()
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
