import { CreateUserController } from '@/presentation/controllers/user'
import { CreateUserUsecase } from '@/data/usecases/user'
import { HashBcryptAdapter } from '@/infra/criptography/bcrypt'
import { CreateUserRepository, GetOneUserByEmailRepository } from '@/infra/db/repositories/user'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeCreateUserValidation } from './validations'

export const makeCreateUserController = (): Controller => {
  const salt = 12
  const createUserRepository = new CreateUserRepository()
  const hashBcryptAdapter = new HashBcryptAdapter(salt)
  const getOneUserByEmailRepository = new GetOneUserByEmailRepository()
  const createUserUsecase = new CreateUserUsecase(hashBcryptAdapter, createUserRepository, getOneUserByEmailRepository)
  const createUserController = new CreateUserController(createUserUsecase, makeCreateUserValidation())
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(createUserController, createLogErrorRepository)
}
