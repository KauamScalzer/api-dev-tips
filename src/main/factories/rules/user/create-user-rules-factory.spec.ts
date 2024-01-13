import { User } from '@/infra/db/typeorm/models'
import { makeCreateUserRules } from '.'
import { Validators } from '@/presentation/protocols/validators'

describe('makeCreateUserRules', () => {
  test('should return correct create user rules', () => {
    const result: Validators = makeCreateUserRules()
    expect(result).toEqual({
      requiredFields: ['name', 'email', 'password', 'passwordConfirmation'],
      compareFields: { field: 'password', fieldToCompare: 'passwordConfirmation' },
      email: 'email',
      cantExist: [{ fieldName: 'email', model: User }]
    })
  })
})
