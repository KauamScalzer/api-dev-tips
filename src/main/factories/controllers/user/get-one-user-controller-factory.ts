import { GetOneUserController } from '@/presentation/controllers/user'
import { GetOneUser } from '@/data/usecases/user'
import { GetOneUserRepository } from '@/infra/db/repositories/user'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeGetOneUserValidation } from '@/main/factories/validations/user'

export const makeGetOneUserController = (): Controller => {
  const getOneUserRepository = new GetOneUserRepository()
  const getOneUser = new GetOneUser(getOneUserRepository)
  const getOneUserController = new GetOneUserController(makeGetOneUserValidation(), getOneUser)
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(getOneUserController, createLogErrorRepository)
}
