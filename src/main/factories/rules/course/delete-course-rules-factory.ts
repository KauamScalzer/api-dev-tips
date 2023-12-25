import { Validators } from '@/presentation/protocols/validators'

export const makeDeleteCourseRules = (): Validators => ({
  requiredFields: ['id']
})
