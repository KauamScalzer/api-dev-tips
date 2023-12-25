import { Comment } from '@/infra/db/typeorm/models'
import { Validators } from '@/presentation/protocols'

export const makeUpdateCommentRules = (): Validators => ({
  requiredFields: ['id', 'comment'],
  haveToExist: [{ fieldName: 'id', model: Comment }]
})
