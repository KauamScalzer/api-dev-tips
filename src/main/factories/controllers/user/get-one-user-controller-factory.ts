import { GetOneUserController } from '@/presentation/controllers/user'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeGetOneUser } from '@/main/factories/usecases/user'
import { makeLogControllerDecorator } from '../../decorators'

export const makeGetOneUserController = (): Controller => {
  const requiredFields = ['id']
  const getOneUserController = new GetOneUserController(makeValidations(requiredFields), makeGetOneUser())
  return makeLogControllerDecorator(getOneUserController)
}
