import { Course, Lesson } from '@/infra/db/typeorm/models'
import { Validators } from '@/presentation/protocols/validators'

export const makeUpdateLessonRules = (): Validators => ({
  requiredFields: ['id', 'courseId', 'name', 'description', 'urlVideo'],
  haveToExist: [{ fieldName: 'courseId', model: Course }, { fieldName: 'id', model: Lesson }]
})
