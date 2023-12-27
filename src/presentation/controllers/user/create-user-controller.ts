import { HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { serverError, created, returnErrorDecider } from '@/presentation/helpers/http'
import { ICreateUser } from '@/domain/usecases/user'

export class CreateUserController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly createUser: ICreateUser
  ) {}

  async handle (httpRequest: CreateUserController.Params): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest)
      if (error) {
        return returnErrorDecider(error)
      }
      const accessToken = await this.createUser.create({
        name: httpRequest.name,
        email: httpRequest.email,
        password: httpRequest.password
      })
      return created({ accessToken })
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
  }
}
