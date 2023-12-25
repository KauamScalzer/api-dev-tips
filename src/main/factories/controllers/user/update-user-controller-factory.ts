import { UpdateUserController } from '@/presentation/controllers/user'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeUpdateUser } from '@/main/factories/usecases/user'
import { makeLogControllerDecorator } from '../../decorators'
import { makeUpdateUserRules } from '../../rules/user'

export const makeUpdateUserController = (): Controller => {
  const createUserController = new UpdateUserController(makeValidations(makeUpdateUserRules()), makeUpdateUser())
  return makeLogControllerDecorator(createUserController)
}
