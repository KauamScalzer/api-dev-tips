import { ValidationComposite, RequiredFieldValidation } from '@/validators'
import { Validation } from '@/presentation/protocols'

export const makeDeleteUserValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
