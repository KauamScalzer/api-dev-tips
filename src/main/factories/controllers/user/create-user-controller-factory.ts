import { CreateUserController } from '@/presentation/controllers/user'
import { Controller } from '@/presentation/protocols'
import { ExistFieldValitation, FieldComparison, makeValidations } from '@/main/factories/validations'
import { makeCreateUser } from '@/main/factories/usecases/user'
import { makeLogControllerDecorator } from '../../decorators'
import { User } from '@/infra/db/typeorm/models'

export const makeCreateUserController = (): Controller => {
  const requiredFields = ['name', 'email', 'password', 'passwordConfirmation', 'urlImage']
  const email = 'email'
  const compareFields: FieldComparison = {
    field: 'password',
    fieldToCompare: 'passwordConfirmation'
  }
  const existFieldValitation: ExistFieldValitation[] = [{
    field: 'email',
    model: User
  }]
  const createUserController = new CreateUserController(makeValidations(requiredFields, compareFields, email, existFieldValitation, null), makeCreateUser())
  return makeLogControllerDecorator(createUserController)
}
