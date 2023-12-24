import { RequiredFieldValidation } from '@/main/validators'
import { Validation } from '@/presentation/protocols'
import { makeGetAllLessonByCourseValidation } from './get-all-lesson-by-course-validation-factory'
import { ValidationComposite } from '@/main/validators/validation-composite'

jest.mock('@/main/validators/validation-composite')

describe('GetAllLessonByCourseValidation factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeGetAllLessonByCourseValidation()
    const validations: Validation[] = []
    for (const field of ['courseId', 'skip', 'take']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
