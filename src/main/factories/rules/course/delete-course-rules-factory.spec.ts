import { makeDeleteCourseRules } from './delete-course-rules-factory'
import { Validators } from '@/presentation/protocols/validators'

describe('makeDeleteCourseRules', () => {
  test('should return correct delete course rules', () => {
    const result: Validators = makeDeleteCourseRules()
    expect(result.requiredFields).toEqual(['id'])
  })
})
