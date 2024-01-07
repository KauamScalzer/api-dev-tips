import { User } from '@/infra/db/typeorm/models'
import { Validators } from '@/presentation/protocols/validators'

export const makeGetOneUserRules = (): Validators => ({
  requiredFields: ['id'],
  haveToExist: [{ fieldName: 'id', model: User }]
})
