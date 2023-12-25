import { Validators } from '@/presentation/protocols/validators'

export const makeGetOneUserRules = (): Validators => ({
  requiredFields: ['id']
})
