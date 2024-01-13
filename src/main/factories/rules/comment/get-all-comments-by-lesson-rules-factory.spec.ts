import { makeGetAllCommentsByLessonRules } from './get-all-comments-by-lesson-rules-factory'
import { Validators } from '@/presentation/protocols/validators'

describe('makeGetAllCommentsByLessonRules', () => {
  test('should return correct get all comments by lesson rules', () => {
    const result: Validators = makeGetAllCommentsByLessonRules()
    expect(result).toEqual({
      requiredFields: ['lessonId', 'skip', 'take']
    })
  })
})
