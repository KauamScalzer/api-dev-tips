import { Validators } from '@/presentation/protocols'

export const makeDeleteLessonRules = (): Validators => ({
  requiredFields: ['id']
})
