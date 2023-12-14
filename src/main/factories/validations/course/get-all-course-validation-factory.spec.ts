import { RequiredFieldValidation } from '@/main/validators'
import { Validation } from '@/presentation/protocols'
import { makeGetAllCourseValidation } from './get-all-course-validation-factory'
import { ValidationComposite } from '@/main/validators/validation-composite'

jest.mock('@/main/validators/validation-composite')

describe('makeGetAllCourseValidation factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeGetAllCourseValidation()
    const validations: Validation[] = []
    for (const field of ['take', 'skip']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
