import { GetOneUserController } from '@/presentation/controllers/user'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeGetOneUser } from '@/main/factories/usecases/user'
import { makeLogControllerDecorator } from '../../decorators'
import { makeGetOneUserRules } from '../../rules/user'

export const makeGetOneUserController = (): Controller => {
  const getOneUserController = new GetOneUserController(makeValidations(makeGetOneUserRules()), makeGetOneUser())
  return makeLogControllerDecorator(getOneUserController)
}
