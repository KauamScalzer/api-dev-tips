import { UserAuthenticationController } from '@/presentation/controllers/user'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeUserAuthentication } from '@/main/factories/usecases/user'
import { makeLogControllerDecorator } from '../../decorators'

export const makeUserAuthenticationController = (): Controller => {
  const requiredFields = ['email', 'password']
  const userAuthenticationController = new UserAuthenticationController(makeValidations(requiredFields), makeUserAuthentication())
  return makeLogControllerDecorator(userAuthenticationController)
}
