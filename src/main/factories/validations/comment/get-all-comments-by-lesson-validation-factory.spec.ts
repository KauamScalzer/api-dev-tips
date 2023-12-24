import { RequiredFieldValidation } from '@/main/validators'
import { Validation } from '@/presentation/protocols'
import { makeGetAllCommentsByLessonValidation } from './get-all-comments-by-lesson-validation-factory'
import { ValidationComposite } from '@/main/validators/validation-composite'

jest.mock('@/main/validators/validation-composite')

describe('GetAllCommentsByLessonValidation factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeGetAllCommentsByLessonValidation()
    const validations: Validation[] = []
    for (const field of ['lessonId', 'skip', 'take']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
