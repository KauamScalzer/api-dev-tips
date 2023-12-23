import { HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http'
import { ICreateUser } from '@/domain/usecases/user'
import { EmailInUseError } from '@/presentation/errors'

export class CreateUserController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly createUser: ICreateUser
  ) {}

  async handle (httpRequest: CreateUserController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest)
      if (error) {
        return badRequest(error)
      }
      const result = await this.createUser.create({
        name: httpRequest.name,
        email: httpRequest.email,
        password: httpRequest.password,
        urlImage: httpRequest.urlImage
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

export namespace CreateUserController {
  export type Params = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
    urlImage: string
  }
}
