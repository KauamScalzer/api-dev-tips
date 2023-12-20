import { UserAuthenticationController } from '@/presentation/controllers/user'
import { Controller } from '@/presentation/protocols'
import { makeUserAuthenticationValidation } from '@/main/factories/validations/user'
import { makeUserAuthentication } from '@/main/factories/usecases/user'
import { makeLogControllerDecorator } from '../../decorators'

export const makeUserAuthenticationController = (): Controller => {
  const userAuthenticationController = new UserAuthenticationController(makeUserAuthenticationValidation(), makeUserAuthentication())
  return makeLogControllerDecorator(userAuthenticationController)
}
