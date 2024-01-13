import { makeDeleteLessonRules } from '.'
import { Validators } from '@/presentation/protocols/validators'

describe('makeDeleteLessonRules', () => {
  test('should return correct delete lesson rules', () => {
    const result: Validators = makeDeleteLessonRules()
    expect(result).toEqual({
      requiredFields: ['id']
    })
  })
})
