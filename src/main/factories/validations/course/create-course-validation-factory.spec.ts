import { RequiredFieldValidation } from '@/validators'
import { Validation } from '@/presentation/protocols'
import { makeCreateCourseValidation } from './create-course-validation-factory'
import { ValidationComposite } from '@/validators/validation-composite'

jest.mock('@/validators/validation-composite')

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
