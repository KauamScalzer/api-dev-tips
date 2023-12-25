import { Validators } from '@/presentation/protocols/validators'

export const makeGetAllCourseRules = (): Validators => ({
  requiredFields: ['take', 'skip']
})
