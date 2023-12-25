import { Validators } from '@/presentation/protocols'

export const makeUserAuthenticationRules = (): Validators => ({
  requiredFields: ['email', 'password'],
  compareFields: null,
  email: null,
  cantExist: null,
  haveToExist: null
})
