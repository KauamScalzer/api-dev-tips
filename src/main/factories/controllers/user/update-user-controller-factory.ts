import { UpdateUserController } from '@/presentation/controllers/user'
import { Controller } from '@/presentation/protocols'
import { makeUpdateUserValidation } from '@/main/factories/validations/user'
import { makeUpdateUser } from '@/main/factories/usecases/user'
import { makeLogControllerDecorator } from '../../decorators'

export const makeUpdateUserController = (): Controller => {
  const createUserController = new UpdateUserController(makeUpdateUserValidation(), makeUpdateUser())
  return makeLogControllerDecorator(createUserController)
}
