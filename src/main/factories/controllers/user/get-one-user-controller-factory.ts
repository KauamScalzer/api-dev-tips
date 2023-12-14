import { GetOneUserController } from '@/presentation/controllers/user'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeGetOneUserValidation } from '@/main/factories/validations/user'
import { makeGetOneUser } from '@/main/factories/usecases/user'

export const makeGetOneUserController = (): Controller => {
  const getOneUserController = new GetOneUserController(makeGetOneUserValidation(), makeGetOneUser())
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(getOneUserController, createLogErrorRepository)
}
