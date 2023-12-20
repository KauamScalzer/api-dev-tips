import { CreateUserController } from '@/presentation/controllers/user'
import { Controller } from '@/presentation/protocols'
import { makeCreateUserValidation } from '@/main/factories/validations/user'
import { makeCreateUser } from '@/main/factories/usecases/user'
import { makeLogControllerDecorator } from '../../decorators'

export const makeCreateUserController = (): Controller => {
  const createUserController = new CreateUserController(makeCreateUserValidation(), makeCreateUser())
  return makeLogControllerDecorator(createUserController)
}
