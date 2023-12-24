import { EmailValidation, RequiredFieldValidation } from '@/main/validators'
import { EmailValidator, Validation } from '@/presentation/protocols'
import { makeUpdateUserValidation } from './update-user-validation-factory'
import { ValidationComposite } from '@/main/validators/validation-composite'

jest.mock('@/main/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('UpdateUserValidation factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUpdateUserValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'id', 'urlImage']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
