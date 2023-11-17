import { RequiredFieldValidation } from '@/validators'
import { Validation } from '@/presentation/protocols'
import { makeCreateUserCoursesValidation } from './create-user-courses-validation-factory'
import { ValidationComposite } from '@/validators/validation-composite'

jest.mock('@/validators/validation-composite')

describe('CreateCourseValidation factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeCreateUserCoursesValidation()
    const validations: Validation[] = []
    for (const field of ['userId', 'courseIds']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
