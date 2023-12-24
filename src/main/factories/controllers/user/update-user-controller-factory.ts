import { UpdateUserController } from '@/presentation/controllers/user'
import { Controller } from '@/presentation/protocols'
import { makeValidations } from '@/main/factories/validations'
import { makeUpdateUser } from '@/main/factories/usecases/user'
import { makeLogControllerDecorator } from '../../decorators'
import { User } from '@/infra/db/typeorm/models'

export const makeUpdateUserController = (): Controller => {
  const requiredFields = ['name', 'email', 'urlImage']
  const fieldValitate = 'email'
  const fieldToValidate = 'id'
  const createUserController = new UpdateUserController(makeValidations(requiredFields, null, null, 'email', fieldValitate, User, fieldToValidate, User), makeUpdateUser())
  return makeLogControllerDecorator(createUserController)
}
