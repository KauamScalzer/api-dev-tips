import { Validators } from '@/presentation/protocols'

export const makeGetAllCommentsByLessonRules = (): Validators => ({
  requiredFields: ['lessonId']
})
