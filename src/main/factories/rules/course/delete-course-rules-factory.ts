import { Validators } from '@/presentation/protocols'

export const makeDeleteCourseRules = (): Validators => ({
  requiredFields: ['id']
})
