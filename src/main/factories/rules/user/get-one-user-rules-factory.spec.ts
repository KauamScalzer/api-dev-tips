import { makeGetOneUserRules } from '.'
import { Validators } from '@/presentation/protocols/validators'

describe('makeGetOneUserRules', () => {
  test('should return correct get one user rules', () => {
    const result: Validators = makeGetOneUserRules()
    expect(result.requiredFields).toEqual(['id'])
  })
})
