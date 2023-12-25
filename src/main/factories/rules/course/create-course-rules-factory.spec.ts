import { makeCreateCourseRules } from './create-course-rules-factory'
import { Validators } from '@/presentation/protocols/validators'

describe('makeCreateCourseRules', () => {
  test('should return correct create course rules', () => {
    const result: Validators = makeCreateCourseRules()
    expect(result.requiredFields).toEqual(['name', 'description', 'author', 'thumb'])
  })
})
