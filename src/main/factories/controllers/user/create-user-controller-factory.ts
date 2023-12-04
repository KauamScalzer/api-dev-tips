import { CreateUserController } from '@/presentation/controllers/user'
import { CreateUser } from '@/data/usecases/user'
import { HashBcryptAdapter } from '@/infra/criptography/bcrypt'
import { CreateUserRepository, GetOneUserByEmailRepository } from '@/infra/db/repositories/user'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeCreateUserValidation } from '@/main/factories/validations/user'

export const makeCreateUserController = (): Controller => {
  const salt = 12
  const createUserRepository = new CreateUserRepository()
  const hashBcryptAdapter = new HashBcryptAdapter(salt)
  const getOneUserByEmailRepository = new GetOneUserByEmailRepository()
  const createUser = new CreateUser(hashBcryptAdapter, createUserRepository, getOneUserByEmailRepository)
  const createUserController = new CreateUserController(createUser, makeCreateUserValidation())
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(createUserController, createLogErrorRepository)
}