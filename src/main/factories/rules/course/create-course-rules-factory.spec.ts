import { makeCreateCourseRules } from './create-course-rules-factory'
import { Validators } from '@/presentation/protocols/validators'

describe('makeCreateCourseRules', () => {
  test('should return correct create course rules', () => {
    const result: Validators = makeCreateCourseRules()
    expect(result).toEqual({
      requiredFields: ['name', 'description', 'author', 'thumb']
    })
  })
})
