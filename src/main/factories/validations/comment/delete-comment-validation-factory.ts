import { ValidationComposite, RequiredFieldValidation } from '@/main/validators'
import { Validation } from '@/presentation/protocols'

export const makeDeleteCommentValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}