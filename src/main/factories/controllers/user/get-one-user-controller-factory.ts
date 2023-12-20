import { GetOneUserController } from '@/presentation/controllers/user'
import { Controller } from '@/presentation/protocols'
import { makeGetOneUserValidation } from '@/main/factories/validations/user'
import { makeGetOneUser } from '@/main/factories/usecases/user'
import { makeLogControllerDecorator } from '../../decorators'

export const makeGetOneUserController = (): Controller => {
  const getOneUserController = new GetOneUserController(makeGetOneUserValidation(), makeGetOneUser())
  return makeLogControllerDecorator(getOneUserController)
}
