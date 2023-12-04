import { HttpRequest, HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http'
import { IUpdateUser } from '@/domain/usecases/user'

export class UpdateUserController implements Controller {
  constructor (
    private readonly updateUser: IUpdateUser,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, urlImage } = httpRequest.body
      await this.updateUser.update({
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