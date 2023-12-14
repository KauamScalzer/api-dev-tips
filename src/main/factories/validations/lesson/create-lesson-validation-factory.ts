import { ValidationComposite, RequiredFieldValidation } from '@/main/validators'
import { Validation } from '@/presentation/protocols'

export const makeCreateLessonValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['courseId', 'name', 'description', 'urlVideo']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
