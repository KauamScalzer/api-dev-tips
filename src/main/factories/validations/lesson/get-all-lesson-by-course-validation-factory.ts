import { ValidationComposite, RequiredFieldValidation } from '@/main/validators'
import { Validation } from '@/presentation/protocols'

export const makeGetAllLessonByCourseValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['courseId', 'skip', 'take']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
