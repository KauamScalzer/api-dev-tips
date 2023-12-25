import { Validators } from '@/presentation/protocols/validators'

export const makeDeleteUserRules = (): Validators => ({
  requiredFields: ['id']
})
