import { Lesson, User } from '@/infra/db/typeorm/models'
import { Validators } from '@/presentation/protocols/validators'

export const makeCreateCommentRules = (): Validators => ({
  requiredFields: ['lessonId', 'userId', 'comment'],
  haveToExist: [{ fieldName: 'userId', model: User }, { fieldName: 'lessonId', model: Lesson }]
})
