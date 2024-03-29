import { makeGetAllLessonsRules } from '.'
import { Validators } from '@/presentation/protocols/validators'

describe('makeGetAllLessonsRules', () => {
  test('should return correct get all lessons rules', () => {
    const result: Validators = makeGetAllLessonsRules()
    expect(result).toEqual({
      requiredFields: ['courseId', 'skip', 'take']
    })
  })
})
