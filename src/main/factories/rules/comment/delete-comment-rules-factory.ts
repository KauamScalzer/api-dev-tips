import { Validators } from '@/presentation/protocols/validators'

export const makeDeleteCommentRules = (): Validators => ({
  requiredFields: ['id']
})
