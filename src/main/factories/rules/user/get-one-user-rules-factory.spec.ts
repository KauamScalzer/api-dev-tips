import { User } from '@/infra/db/typeorm/models'
import { makeGetOneUserRules } from '.'
import { Validators } from '@/presentation/protocols/validators'

describe('makeGetOneUserRules', () => {
  test('should return correct get one user rules', () => {
    const result: Validators = makeGetOneUserRules()
    expect(result).toEqual({
      requiredFields: ['id'],
      haveToExist: [{ fieldName: 'id', model: User }]
    })
  })
})
