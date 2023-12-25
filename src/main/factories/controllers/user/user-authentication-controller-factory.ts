import { UserAuthenticationController } from '@/presentation/controllers/user'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeUserAuthentication } from '@/main/factories/usecases/user'
import { makeLogControllerDecorator } from '../../decorators'
import { makeUserAuthenticationRules } from '../../rules/user'

export const makeUserAuthenticationController = (): Controller => {
  const userAuthenticationController = new UserAuthenticationController(makeValidations(makeUserAuthenticationRules()), makeUserAuthentication())
  return makeLogControllerDecorator(userAuthenticationController)
}
