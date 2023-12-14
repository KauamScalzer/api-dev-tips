import { ValidationComposite, RequiredFieldValidation } from '@/main/validators'
import { Validation } from '@/presentation/protocols'

export const makeGetAllCourseByUserValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['take', 'skip', 'userId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
