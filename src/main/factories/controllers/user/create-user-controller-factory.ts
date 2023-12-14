import { CreateUserController } from '@/presentation/controllers/user'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeCreateUserValidation } from '@/main/factories/validations/user'
import { makeCreateUser } from '@/main/factories/usecases/user'

export const makeCreateUserController = (): Controller => {
  const createUserController = new CreateUserController(makeCreateUserValidation(), makeCreateUser())
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(createUserController, createLogErrorRepository)
}
