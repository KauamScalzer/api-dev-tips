import { ValidationComposite, RequiredFieldValidation } from '@/presentation/helpers/validators'
import { Validation } from '@/presentation/protocols'

export const makeCreateCommentValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['lessonId', 'userId', 'comment']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
