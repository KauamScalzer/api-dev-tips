import { Course } from '@/infra/db/typeorm/models'
import { Validators } from '@/presentation/protocols'

export const makeUpdateCourseRules = (): Validators => ({
  requiredFields: ['name', 'description', 'author', 'thumb', 'id'],
  haveToExist: [{ fieldName: 'id', model: Course }]
})
