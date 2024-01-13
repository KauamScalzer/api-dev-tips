import { Validators } from '@/presentation/protocols/validators'

export const makeGetAllCommentsByLessonRules = (): Validators => ({
  requiredFields: ['lessonId', 'skip', 'take']
})
