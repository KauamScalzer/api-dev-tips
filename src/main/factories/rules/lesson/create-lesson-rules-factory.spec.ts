import { Course } from '@/infra/db/typeorm/models'
import { makeCreateLessonRules } from '.'
import { Validators } from '@/presentation/protocols/validators'

describe('makeCreateLessonRules', () => {
  test('should return correct create lesson rules', () => {
    const result: Validators = makeCreateLessonRules()
    expect(result).toEqual({
      requiredFields: ['courseId', 'name', 'description', 'urlVideo'],
      haveToExist: [{ fieldName: 'courseId', model: Course }]
    })
  })
})
