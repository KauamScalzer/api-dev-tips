import { CompareFieldValidation, RequiredFieldValidation } from '@/main/validators'
import { Validation, EmailValidator } from '@/presentation/protocols'
import { makeValidations } from './validations-factory'
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

describe('makeValidations factory', () => {
  const requiredFields = ['name', 'email', 'password', 'passwordConfirmation', 'urlImage']
  const email = 'email'
  const field = 'password'
  const fieldToCompare = 'passwordConfirmation'
  test('Should call ValidationComposite with all validations', () => {
    makeValidations(requiredFields, field, fieldToCompare, email)
    const validations: Validation[] = []
    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation(field, fieldToCompare))
    validations.push(new EmailValidation(email, makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
