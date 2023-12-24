import { EmailValidatorAdapter } from '@/main/adapters/validators'
import { ValidationComposite, RequiredFieldValidation, EmailValidation, CompareFieldValidation } from '@/main/validators'
import { Validation } from '@/presentation/protocols'

export const makeValidations = (requiredFields: string[], field?: string, fieldToCompare?: string, email?: string): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  if (field && fieldToCompare) {
    validations.push(new CompareFieldValidation(field, fieldToCompare))
  }
  if (email) {
    validations.push(new EmailValidation(email, new EmailValidatorAdapter()))
  }
  return new ValidationComposite(validations)
}
