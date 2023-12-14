import { UpdateUserController } from '@/presentation/controllers/user'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeUpdateUserValidation } from '@/main/factories/validations/user'
import { makeUpdateUser } from '@/main/factories/usecases/user'

export const makeUpdateUserController = (): Controller => {
  const createUserController = new UpdateUserController(makeUpdateUserValidation(), makeUpdateUser())
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(createUserController, createLogErrorRepository)
}
