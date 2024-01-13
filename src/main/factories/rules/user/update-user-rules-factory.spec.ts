import { User } from '@/infra/db/typeorm/models'
import { makeUpdateUserRules } from '.'
import { Validators } from '@/presentation/protocols/validators'

describe('makeUpdateUserRules', () => {
  test('should return correct update user rules', () => {
    const result: Validators = makeUpdateUserRules()
    expect(result).toEqual({
      requiredFields: ['name', 'email'],
      email: 'email',
      cantExist: [{ fieldName: 'email', model: User }],
      haveToExist: [{ fieldName: 'id', model: User }]
    })
  })
})
