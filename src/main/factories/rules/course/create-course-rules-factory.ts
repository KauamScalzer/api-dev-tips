import { Validators } from '@/presentation/protocols/validators'

export const makeCreateCourseRules = (): Validators => ({
  requiredFields: ['name', 'description', 'author', 'thumb']
})
