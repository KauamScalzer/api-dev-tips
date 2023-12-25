import { CreateUserController } from '@/presentation/controllers/user'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeCreateUser } from '@/main/factories/usecases/user'
import { makeLogControllerDecorator } from '../../decorators'
import { makeCreateUserRules } from '../../rules/user'

export const makeCreateUserController = (): Controller => {
  const createUserController = new CreateUserController(makeValidations(makeCreateUserRules()), makeCreateUser())
  return makeLogControllerDecorator(createUserController)
}
