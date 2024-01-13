import { Comment } from '@/infra/db/typeorm/models'
import { makeUpdateCommentRules } from './update-comment-rules-factory'
import { Validators } from '@/presentation/protocols/validators'

describe('makeUpdateCommentRules', () => {
  test('should return correct update comment rules', () => {
    const result: Validators = makeUpdateCommentRules()
    expect(result).toEqual({
      requiredFields: ['id', 'comment'],
      haveToExist: [{ fieldName: 'id', model: Comment }]
    })
  })
})
