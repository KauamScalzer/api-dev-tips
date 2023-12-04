import { HttpRequest, HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { badRequest, serverError, ok } from '@/presentation/helpers/http'
import { IGetOneUser } from '@/domain/usecases/user'

export class GetOneUserController implements Controller {
  constructor (
    private readonly getOneUser: IGetOneUser,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }
      const params = httpRequest.params
      const result = await this.getOneUser.getOne(params.id)
      return ok(result)
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
