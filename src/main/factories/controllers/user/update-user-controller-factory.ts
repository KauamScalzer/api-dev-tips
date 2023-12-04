import { UpdateUserController } from '@/presentation/controllers/user'
import { UpdateUser } from '@/data/usecases/user'
import { UpdateUserRepository } from '@/infra/db/repositories/user'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeUpdateUserValidation } from '@/main/factories/validations/user'

export const makeUpdateUserController = (): Controller => {
  const updateUserRepository = new UpdateUserRepository()
  const updateUser = new UpdateUser(updateUserRepository)
  const createUserController = new UpdateUserController(updateUser, makeUpdateUserValidation())
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(createUserController, createLogErrorRepository)
}
