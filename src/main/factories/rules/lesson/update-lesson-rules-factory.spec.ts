import { Course, Lesson } from '@/infra/db/typeorm/models'
import { makeUpdateLessonRules } from '.'
import { Validators } from '@/presentation/protocols/validators'

describe('makeUpdateLessonRules', () => {
  test('should return correct update lesson rules', () => {
    const result: Validators = makeUpdateLessonRules()
    expect(result).toEqual({
      requiredFields: ['id', 'courseId', 'name', 'description', 'urlVideo'],
      haveToExist: [{ fieldName: 'courseId', model: Course }, { fieldName: 'id', model: Lesson }]
    })
  })
})
