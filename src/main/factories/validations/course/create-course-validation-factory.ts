import { ValidationComposite, RequiredFieldValidation } from '@/validators'
import { Validation } from '@/presentation/protocols'

export const makeCreateCourseValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'description', 'author', 'thumb']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
