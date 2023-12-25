import { Course } from '@/infra/db/typeorm/models'
import { Validators } from '@/presentation/protocols'

export const makeCreateLessonRules = (): Validators => ({
  requiredFields: ['courseId', 'name', 'description', 'urlVideo'],
  haveToExist: [{ fieldName: 'courseId', model: Course }]
})
