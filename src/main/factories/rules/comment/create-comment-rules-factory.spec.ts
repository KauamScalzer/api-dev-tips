import { Lesson, User } from '@/infra/db/typeorm/models'
import { makeCreateCommentRules } from './create-comment-rules-factory'
import { Validators } from '@/presentation/protocols/validators'

describe('makeCreateCommentRules', () => {
  test('should return correct create comment rules', () => {
    const result: Validators = makeCreateCommentRules()
    expect(result).toEqual({
      requiredFields: ['lessonId', 'userId', 'comment'],
      haveToExist: [{ fieldName: 'userId', model: User }, { fieldName: 'lessonId', model: Lesson }]
    })
  })
})
