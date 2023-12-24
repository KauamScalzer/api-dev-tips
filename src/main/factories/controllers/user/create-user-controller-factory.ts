import { CreateUserController } from '@/presentation/controllers/user'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeCreateUser } from '@/main/factories/usecases/user'
import { makeLogControllerDecorator } from '../../decorators'

export const makeCreateUserController = (): Controller => {
  const requiredFields = ['name', 'email', 'password', 'passwordConfirmation', 'urlImage']
  const email = 'email'
  const field = 'password'
  const fieldToCompare = 'passwordConfirmation'
  const createUserController = new CreateUserController(makeValidations(requiredFields, field, fieldToCompare, email), makeCreateUser())
  return makeLogControllerDecorator(createUserController)
}
