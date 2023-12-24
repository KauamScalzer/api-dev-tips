import { RequiredFieldValidation } from '@/main/validators'
import { Validation } from '@/presentation/protocols'
import { makeGetAllCourseByUserValidation } from './get-all-course-by-user-validation-factory'
import { ValidationComposite } from '@/main/validators/validation-composite'

jest.mock('@/main/validators/validation-composite')

describe('GetAllCourseByUserValidation factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeGetAllCourseByUserValidation()
    const validations: Validation[] = []
    for (const field of ['take', 'skip', 'userId']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
