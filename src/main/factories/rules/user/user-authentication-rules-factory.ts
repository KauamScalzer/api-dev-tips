import { Validators } from '@/presentation/protocols/validators'

export const makeUserAuthenticationRules = (): Validators => ({
  requiredFields: ['email', 'password'],
  compareFields: null,
  email: null,
  cantExist: null,
  haveToExist: null
})
