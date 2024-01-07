import { User } from '@/infra/db/typeorm/models'
import { makeDeleteUserRules } from '.'
import { Validators } from '@/presentation/protocols/validators'

describe('makeDeleteUserRules', () => {
  test('should return correct delete user rules', () => {
    const result: Validators = makeDeleteUserRules()
    expect(result.requiredFields).toEqual(['id'])
    expect(result.haveToExist).toEqual([{ fieldName: 'id', model: User }])
  })
})
