import { User } from '@/infra/db/typeorm/models'
import { makeCreateUserCourseRules } from '.'
import { Validators } from '@/presentation/protocols/validators'

describe('makeCreateUserCourseRules', () => {
  test('should return correct create course rules', () => {
    const result: Validators = makeCreateUserCourseRules()
    expect(result).toEqual({
      requiredFields: ['userId', 'courseIds'],
      haveToExist: [{ fieldName: 'userId', model: User }]
    })
  })
})
