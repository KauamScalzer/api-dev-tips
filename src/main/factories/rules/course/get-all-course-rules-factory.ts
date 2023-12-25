import { Validators } from '@/presentation/protocols'

export const makeGetAllCourseRules = (): Validators => ({
  requiredFields: ['take', 'skip']
})
