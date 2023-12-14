import { RequiredFieldValidation } from '@/main/validators'
import { Validation, EmailValidator } from '@/presentation/protocols'
import { makeUserAuthenticationValidation } from './user-authentication-validation-factory'
import { ValidationComposite } from '@/main/validators/validation-composite'
import { EmailValidation } from '@/main/validators/email-validation'

jest.mock('@/main/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('UserAuthenticationValidation factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUserAuthenticationValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
