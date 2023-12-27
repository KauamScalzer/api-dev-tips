import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { returnErrorDecider, ok, serverError, unauthorized } from '@/presentation/helpers'
import { IUserAuthentication } from '@/domain/usecases/user'

export class UserAuthenticationController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly userAuthentication: IUserAuthentication
  ) {}

  async handle (httpRequest: UserAuthenticationController.Params): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest)
      if (error) {
        return returnErrorDecider(error)
      }
      const accessToken = await this.userAuthentication.auth({
        email: httpRequest.email,
        password: httpRequest.password
      })
      if (!accessToken) {
        return unauthorized()
      }
      return ok({ accessToken })
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace UserAuthenticationController {
  export type Params = {
    email: string
    password: string
  }
}
