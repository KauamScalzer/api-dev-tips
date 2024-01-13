import { Course } from '@/infra/db/typeorm/models'
import { makeUpdateCourseRules } from './update-course-rules-factory'
import { Validators } from '@/presentation/protocols/validators'

describe('makeUpdateCourseRules', () => {
  test('should return correct update course rules', () => {
    const result: Validators = makeUpdateCourseRules()
    expect(result).toEqual({
      requiredFields: ['name', 'description', 'author', 'thumb', 'id'],
      haveToExist: [{ fieldName: 'id', model: Course }]
    })
  })
})
