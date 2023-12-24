import { UpdateUserController } from '@/presentation/controllers/user'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeUpdateUser } from '@/main/factories/usecases/user'
import { makeLogControllerDecorator } from '../../decorators'

export const makeUpdateUserController = (): Controller => {
  const requiredFields = ['name', 'email', 'urlImage']
  const createUserController = new UpdateUserController(makeValidations(requiredFields, null, null, 'email'), makeUpdateUser())
  return makeLogControllerDecorator(createUserController)
}
