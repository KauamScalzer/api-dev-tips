import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http'
import { IUserAuthenticationUsecase } from '@/domain/usecases/user'

export class UserAuthenticationController implements Controller {
  constructor (
    private readonly userAuthenticationUsecase: IUserAuthenticationUsecase,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const accessToken = await this.userAuthenticationUsecase.auth({
        email,
        password
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
