import { Validators } from '@/presentation/protocols/validators'

export const makeDeleteLessonRules = (): Validators => ({
  requiredFields: ['id']
})
