import { User } from '@/infra/db/typeorm/models'
import { Validators } from '@/presentation/protocols/validators'

export const makeUpdateUserRules = (): Validators => ({
  requiredFields: ['name', 'email'],
  email: 'email',
  cantExist: [{ fieldName: 'email', model: User }],
  haveToExist: [{ fieldName: 'id', model: User }]
})
