import { UserAuthenticationController } from '@/presentation/controllers/user'
import { UserAuthentication } from '@/data/usecases/user'
import { GetOneUserByEmailRepository, UpdateUserRepository } from '@/infra/db/repositories/user'
import { HashComparerBcryptAdapter } from '@/infra/criptography/bcrypt'
import { EncrypterJwtAdapter } from '@/infra/criptography/jwt'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeUserAuthenticationValidation } from './validations'

export const makeUserAuthenticationController = (): Controller => {
  const getOneUserByEmailRepository = new GetOneUserByEmailRepository()
  const hashComparerBcryptAdapter = new HashComparerBcryptAdapter()
  const encrypterJwtAdapter = new EncrypterJwtAdapter('1')
  const updateUserRepository = new UpdateUserRepository()
  const userAuthentication = new UserAuthentication(getOneUserByEmailRepository, hashComparerBcryptAdapter, encrypterJwtAdapter, updateUserRepository)
  const userAuthenticationController = new UserAuthenticationController(userAuthentication, makeUserAuthenticationValidation())
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(userAuthenticationController, createLogErrorRepository)
}
