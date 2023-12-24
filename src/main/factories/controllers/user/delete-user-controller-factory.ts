import { DeleteUserController } from '@/presentation/controllers/user'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeDeleteUser } from '@/main/factories/usecases/user'
import { makeLogControllerDecorator } from '../../decorators'

export const makeDeleteUserController = (): Controller => {
  const requiredFields = ['id']
  const createUserController = new DeleteUserController(makeValidations(requiredFields, null, null, null), makeDeleteUser())
  return makeLogControllerDecorator(createUserController)
}
