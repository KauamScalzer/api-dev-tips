import { Validators } from '@/presentation/protocols'

export const makeGetOneUserRules = (): Validators => ({
  requiredFields: ['id']
})
