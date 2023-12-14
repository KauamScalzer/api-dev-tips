import { RequiredFieldValidation } from '@/main/validators'
import { Validation } from '@/presentation/protocols'
import { makeCreateCourseValidation } from './create-course-validation-factory'
import { ValidationComposite } from '@/main/validators/validation-composite'

jest.mock('@/main/validators/validation-composite')

describe('CreateCourseValidation factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeCreateCourseValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'description', 'author', 'thumb']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
