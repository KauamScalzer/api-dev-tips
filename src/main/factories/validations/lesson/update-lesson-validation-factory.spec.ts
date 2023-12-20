import { RequiredFieldValidation } from '@/main/validators'
import { Validation } from '@/presentation/protocols'
import { makeUpdateLessonValidation } from './update-lesson-validation-factory'
import { ValidationComposite } from '@/main/validators/validation-composite'

jest.mock('@/main/validators/validation-composite')

describe('UpdateLessonValidation factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUpdateLessonValidation()
    const validations: Validation[] = []
    for (const field of ['id', 'courseId', 'name', 'description', 'urlVideo']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
