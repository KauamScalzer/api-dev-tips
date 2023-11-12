import { ValidationComposite, RequiredFieldValidation } from '@/presentation/helpers/validators'
import { Validation } from '@/presentation/protocols'

export const makeCreateUserCoursesValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['userId', 'courseIds']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
