import { RequiredFieldValidation } from '@/validators'
import { Validation } from '@/presentation/protocols'
import { makeCreateLessonValidation } from './create-lesson-validation-factory'
import { ValidationComposite } from '@/validators/validation-composite'

jest.mock('@/validators/validation-composite')

describe('CreateCourseValidation factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeCreateLessonValidation()
    const validations: Validation[] = []
    for (const field of ['courseId', 'name', 'description', 'urlVideo']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
