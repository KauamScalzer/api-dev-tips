import { Course } from '@/infra/db/typeorm/models'
import { makeCreateLessonRules } from '.'
import { Validators } from '@/presentation/protocols/validators'

describe('makeCreateLessonRules', () => {
  test('should return correct create lesson rules', () => {
    const result: Validators = makeCreateLessonRules()
    expect(result.requiredFields).toEqual(['courseId', 'name', 'description', 'urlVideo'])
    expect(result.haveToExist).toEqual([{ fieldName: 'courseId', model: Course }])
  })
})
