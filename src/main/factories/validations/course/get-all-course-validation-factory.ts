import { ValidationComposite, RequiredFieldValidation } from '@/main/validators'
import { Validation } from '@/presentation/protocols'

export const makeGetAllCourseValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['take', 'skip']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
