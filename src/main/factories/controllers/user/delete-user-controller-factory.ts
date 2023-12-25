import { DeleteUserController } from '@/presentation/controllers/user'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeDeleteUser } from '@/main/factories/usecases/user'
import { makeLogControllerDecorator } from '../../decorators'
import { makeDeleteUserRules } from '../../rules/user'

export const makeDeleteUserController = (): Controller => {
  const createUserController = new DeleteUserController(makeValidations(makeDeleteUserRules()), makeDeleteUser())
  return makeLogControllerDecorator(createUserController)
}
