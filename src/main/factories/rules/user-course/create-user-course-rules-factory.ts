import { User } from '@/infra/db/typeorm/models'
import { Validators } from '@/presentation/protocols/validators'

export const makeCreateUserCourseRules = (): Validators => ({
  requiredFields: ['userId', 'courseIds'],
  haveToExist: [{ fieldName: 'userId', model: User }]
})
