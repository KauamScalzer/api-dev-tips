import { UpdateUserController } from '@/presentation/controllers/user'
import { Controller } from '@/presentation/protocols'
import { ExistFieldValitation, NotExistFieldValitation, makeValidations } from '@/main/factories/validations'
import { makeUpdateUser } from '@/main/factories/usecases/user'
import { makeLogControllerDecorator } from '../../decorators'
import { User } from '@/infra/db/typeorm/models'

export const makeUpdateUserController = (): Controller => {
  const requiredFields: string[] = ['name', 'email', 'urlImage']
  const existFieldValitation: ExistFieldValitation[] = [{
    field: 'email',
    model: User
  }]
  const notExistFieldValitation: NotExistFieldValitation[] = [{
    field: 'id',
    model: User
  }]
  const createUserController = new UpdateUserController(makeValidations(requiredFields, null, 'email', existFieldValitation, notExistFieldValitation), makeUpdateUser())
  return makeLogControllerDecorator(createUserController)
}
