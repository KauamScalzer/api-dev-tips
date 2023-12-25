import { User } from '@/infra/db/typeorm/models'
import { makeCreateUserRules } from '.'
import { Validators } from '@/presentation/protocols/validators'

describe('makeCreateUserRules', () => {
  test('should return correct create user rules', () => {
    const result: Validators = makeCreateUserRules()
    expect(result.requiredFields).toEqual(['name', 'email'])
    expect(result.compareFields).toEqual({ field: 'password', fieldToCompare: 'passwordConfirmation' })
    expect(result.email).toEqual('email')
    expect(result.cantExist).toEqual([{ fieldName: 'email', model: User }])
  })
})
