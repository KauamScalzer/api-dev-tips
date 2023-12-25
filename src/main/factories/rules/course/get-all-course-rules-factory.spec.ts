import { makeGetAllCourseRules } from './get-all-course-rules-factory'
import { Validators } from '@/presentation/protocols/validators'

describe('makeGetAllCourseRules', () => {
  test('should return correct get all course rules', () => {
    const result: Validators = makeGetAllCourseRules()
    expect(result.requiredFields).toEqual(['take', 'skip'])
  })
})
