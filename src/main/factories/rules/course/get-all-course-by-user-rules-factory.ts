import { Validators } from '@/presentation/protocols/validators'

export const makeGetAllCourseByUserRules = (): Validators => ({
  requiredFields: ['take', 'skip', 'userId']
})
