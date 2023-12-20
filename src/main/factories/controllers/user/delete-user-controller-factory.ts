import { DeleteUserController } from '@/presentation/controllers/user'
import { Controller } from '@/presentation/protocols'
import { makeDeleteUserValidation } from '@/main/factories/validations/user'
import { makeDeleteUser } from '@/main/factories/usecases/user'
import { makeLogControllerDecorator } from '../../decorators'

export const makeDeleteUserController = (): Controller => {
  const createUserController = new DeleteUserController(makeDeleteUserValidation(), makeDeleteUser())
  return makeLogControllerDecorator(createUserController)
}
