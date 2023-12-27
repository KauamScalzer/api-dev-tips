import { HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { returnErrorDecider, serverError, noContent } from '@/presentation/helpers'
import { IUpdateUser } from '@/domain/usecases/user'

export class UpdateUserController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateUser: IUpdateUser
  ) {}

  async handle (httpRequest: UpdateUserController.Params): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest)
      if (error) {
        return returnErrorDecider(error)
      }
      await this.updateUser.update({
        id: httpRequest.id,
        name: httpRequest.name,
        email: httpRequest.email
      })
      return noContent()
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}

export namespace UpdateUserController {
  export type Params = {
    id: number
    name: string
    email: string
  }
}
