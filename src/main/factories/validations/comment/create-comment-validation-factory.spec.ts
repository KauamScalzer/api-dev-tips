import { RequiredFieldValidation } from '@/main/validators'
import { Validation } from '@/presentation/protocols'
import { makeCreateCommentValidation } from './create-comment-validation-factory'
import { ValidationComposite } from '@/main/validators/validation-composite'

jest.mock('@/main/validators/validation-composite')

describe('CreateCourseValidation factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeCreateCommentValidation()
    const validations: Validation[] = []
    for (const field of ['lessonId', 'userId', 'comment']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
