import { Validators } from '@/presentation/protocols/validators'

export const makeGetAllLessonsRules = (): Validators => ({
  requiredFields: ['courseId', 'skip', 'take']
})
