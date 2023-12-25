import { Validators } from '@/presentation/protocols'

export const makeDeleteCommentRules = (): Validators => ({
  requiredFields: ['id']
})
