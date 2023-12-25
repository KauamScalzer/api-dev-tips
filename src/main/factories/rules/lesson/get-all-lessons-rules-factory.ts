import { Validators } from '@/presentation/protocols'

export const makeGetAllLessonsRules = (): Validators => ({
  requiredFields: ['courseId', 'skip', 'take']
})
