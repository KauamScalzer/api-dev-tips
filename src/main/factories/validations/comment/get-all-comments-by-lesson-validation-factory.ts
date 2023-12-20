import { ValidationComposite, RequiredFieldValidation } from '@/main/validators'
import { Validation } from '@/presentation/protocols'

export const makeGetAllCommentsByLessonValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['lessonId', 'skip', 'take']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
