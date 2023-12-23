import { ValidationComposite, RequiredFieldValidation } from '@/main/validators'
import { Validation } from '@/presentation/protocols'

export const makeUpdateCommentValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id', 'comment']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}