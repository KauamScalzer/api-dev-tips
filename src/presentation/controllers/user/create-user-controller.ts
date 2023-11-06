import { HttpRequest, HttpResponse, Controller } from '../../protocols'
import { badRequest, serverError, ok } from '../../helpers/http'
import { ICreateUserUsecase } from '../../../domain/usecases/user'
import { Validation } from '../../helpers/validators'

export class CreateUserController implements Controller {
  constructor (
    private readonly createUser: ICreateUserUsecase,
    private readonly validation: Validation
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
      return ok(result)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
