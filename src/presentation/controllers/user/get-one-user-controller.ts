import { HttpRequest, HttpResponse, Controller, Validation } from '@/presentation/protocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http'
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
      await this.getOneUser.getOne(params.id)
      return noContent()
    } catch (error: any) {
      console.log(error)
      return serverError(error)
    }
  }
}
