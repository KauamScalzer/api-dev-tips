import { HttpRequest, HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http'
import { ICreateUser } from '@/domain/usecases/user'
import { EmailInUseError } from '@/presentation/errors'

export class CreateUserController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly createUser: ICreateUser
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password, urlImage } = httpRequest.body
      const result = await this.createUser.create({
        name,
        email,
        password,
        urlImage
      })
      if (!result) {
        return forbidden(new EmailInUseError())
      }
      return ok(result)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
