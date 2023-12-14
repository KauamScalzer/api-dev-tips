import { CompareFieldValidation, RequiredFieldValidation } from '@/main/validators'
import { Validation, EmailValidator } from '@/presentation/protocols'
import { makeCreateUserValidation } from './create-user-validation-factory'
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

describe('CreateUserValidation factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeCreateUserValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation', 'urlImage']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
