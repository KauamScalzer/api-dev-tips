import { RequiredFieldValidation } from '@/main/validators'
import { Validation } from '@/presentation/protocols'
import { makeUpdateCommentValidation } from './update-comment-validation-factory'
import { ValidationComposite } from '@/main/validators/validation-composite'

jest.mock('@/main/validators/validation-composite')

describe('UpdateCommentValidation factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUpdateCommentValidation()
    const validations: Validation[] = []
    for (const field of ['id', 'comment']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
