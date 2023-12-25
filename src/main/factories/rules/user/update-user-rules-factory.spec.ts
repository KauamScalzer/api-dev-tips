import { User } from '@/infra/db/typeorm/models'
import { makeUpdateUserRules } from '.'
import { Validators } from '@/presentation/protocols/validators'

describe('makeUpdateUserRules', () => {
  test('should return correct update user rules', () => {
    const result: Validators = makeUpdateUserRules()
    expect(result.requiredFields).toEqual(['name', 'email', 'urlImage'])
    expect(result.compareFields).toEqual({ field: 'password', fieldToCompare: 'confirmPassword' })
    expect(result.email).toEqual('email')
    expect(result.cantExist).toEqual([{ fieldName: 'email', model: User }])
    expect(result.haveToExist).toEqual([{ fieldName: 'id', model: User }])
  })
})
