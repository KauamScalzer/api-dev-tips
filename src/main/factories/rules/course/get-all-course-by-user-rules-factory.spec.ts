import { makeGetAllCourseByUserRules } from './get-all-course-by-user-rules-factory'
import { Validators } from '@/presentation/protocols/validators'

describe('makeGetAllCourseByUserRules', () => {
  test('should return correct get all course by user rules', () => {
    const result: Validators = makeGetAllCourseByUserRules()
    expect(result.requiredFields).toEqual(['take', 'skip', 'userId'])
  })
})
