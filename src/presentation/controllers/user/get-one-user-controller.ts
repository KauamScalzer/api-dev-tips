import { HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { badRequest, serverError, ok } from '@/presentation/helpers/http'
import { IGetOneUser } from '@/domain/usecases/user'

export class GetOneUserController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly getOneUser: IGetOneUser
  ) {}

  async handle (httpRequest: GetOneUserController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest)
      if (error) {
        return badRequest(error)
      }
      const result = await this.getOneUser.getOne(httpRequest.id)
      return ok(result)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}

export namespace GetOneUserController {
  export type Params = {
    id: number
  }
}
