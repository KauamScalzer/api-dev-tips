import { Validators } from '@/presentation/protocols'

export const makeDeleteUserRules = (): Validators => ({
  requiredFields: ['id']
})
