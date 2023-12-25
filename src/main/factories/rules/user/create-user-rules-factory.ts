import { User } from '@/infra/db/typeorm/models'
import { Validators } from '@/presentation/protocols'

export const makeCreateUserRules = (): Validators => ({
  requiredFields: ['name', 'email'],
  compareFields: { field: 'password', fieldToCompare: 'passwordConfirmation' },
  email: 'email',
  cantExist: [{ fieldName: 'email', model: User }],
  haveToExist: null
})
