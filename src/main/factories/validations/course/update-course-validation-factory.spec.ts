import { RequiredFieldValidation } from '@/main/validators'
import { Validation } from '@/presentation/protocols'
import { makeUpdateCourseValidation } from './update-course-validation-factory'
import { ValidationComposite } from '@/main/validators/validation-composite'

jest.mock('@/main/validators/validation-composite')

describe('UpdateCourseValidation factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUpdateCourseValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'description', 'author', 'thumb', 'id']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
