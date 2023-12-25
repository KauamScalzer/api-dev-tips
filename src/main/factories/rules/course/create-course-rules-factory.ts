import { Validators } from '@/presentation/protocols'

export const makeCreateCourseRules = (): Validators => ({
  requiredFields: ['name', 'description', 'author', 'thumb']
})
