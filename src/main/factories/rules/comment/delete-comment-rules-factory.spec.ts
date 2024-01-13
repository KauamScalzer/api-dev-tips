import { makeDeleteCommentRules } from './delete-comment-rules-factory'
import { Validators } from '@/presentation/protocols/validators'

describe('makeDeleteCommentRules', () => {
  test('should return correct delete comment rules', () => {
    const result: Validators = makeDeleteCommentRules()
    expect(result).toEqual({
      requiredFields: ['id']
    })
  })
})
