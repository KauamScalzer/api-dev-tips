import { Validators } from '@/presentation/protocols'

export const makeGetAllCourseByUserRules = (): Validators => ({
  requiredFields: ['take', 'skip', 'userId']
})
