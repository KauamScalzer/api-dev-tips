import { User } from '@/infra/db/typeorm/models'
import { Validators } from '@/presentation/protocols/validators'

export const makeCreateUserRules = (): Validators => ({
  requiredFields: ['name', 'email', 'password', 'passwordConfirmation'],
  compareFields: { field: 'password', fieldToCompare: 'passwordConfirmation' },
  email: 'email',
  cantExist: [{ fieldName: 'email', model: User }]
})
