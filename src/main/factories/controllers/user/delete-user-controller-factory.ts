import { DeleteUserController } from '@/presentation/controllers/user'
import { DeleteUser } from '@/data/usecases/user'
import { DeleteUserRepository } from '@/infra/db/repositories/user'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeDeleteUserValidation } from '@/main/factories/validations/user'

export const makeDeleteUserController = (): Controller => {
  const deleteUserRepository = new DeleteUserRepository()
  const deleteUser = new DeleteUser(deleteUserRepository)
  const createUserController = new DeleteUserController(makeDeleteUserValidation(), deleteUser)
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(createUserController, createLogErrorRepository)
}
