import { DeleteUserController } from '@/presentation/controllers/user'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeDeleteUserValidation } from '@/main/factories/validations/user'
import { makeDeleteUser } from '@/main/factories/usecases/user'

export const makeDeleteUserController = (): Controller => {
  const createUserController = new DeleteUserController(makeDeleteUserValidation(), makeDeleteUser())
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(createUserController, createLogErrorRepository)
}
