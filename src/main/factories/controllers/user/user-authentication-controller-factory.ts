import { UserAuthenticationController } from '@/presentation/controllers/user'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeUserAuthenticationValidation } from '@/main/factories/validations/user'
import { makeUserAuthentication } from '@/main/factories/usecases/user'

export const makeUserAuthenticationController = (): Controller => {
  const userAuthenticationController = new UserAuthenticationController(makeUserAuthenticationValidation(), makeUserAuthentication())
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(userAuthenticationController, createLogErrorRepository)
}
