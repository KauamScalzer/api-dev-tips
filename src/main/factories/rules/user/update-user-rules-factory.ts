import { User } from '@/infra/db/typeorm/models'
import { Validators } from '@/presentation/protocols'

export const makeUpdateUserRules = (): Validators => ({
  requiredFields: ['name', 'email', 'urlImage'],
  compareFields: { field: 'password', fieldToCompare: 'confirmPassword' },
  email: 'email',
  cantExist: [{ fieldName: 'email', model: User }],
  haveToExist: [{ fieldName: 'id', model: User }]
})
