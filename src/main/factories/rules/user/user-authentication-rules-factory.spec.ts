import { makeUserAuthenticationRules } from '.'
import { Validators } from '@/presentation/protocols/validators'

describe('makeUpdateUserRules', () => {
  test('should return correct user authentication rules', () => {
    const result: Validators = makeUserAuthenticationRules()
    expect(result).toEqual({
      requiredFields: ['email', 'password']
    })
  })
})
