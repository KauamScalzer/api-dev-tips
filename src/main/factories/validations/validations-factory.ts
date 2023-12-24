import { EmailValidatorAdapter } from '@/main/adapters/validators'
import { ValidationComposite, RequiredFieldValidation, EmailValidation, CompareFieldValidation, FieldInUseValidation, FieldNotFoundValidation } from '@/main/validators'
import { Validation } from '@/presentation/protocols'
import { GetOneCustomRepository } from '@/infra/db/repositories/validation'

export const makeValidations = (requiredFields: string[], field?: string, fieldToCompare?: string, email?: string, notExistField?: string, model?: any, existField?: string, seccondModel?: any): ValidationComposite => {
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
  if (notExistField && model) {
    validations.push(new FieldInUseValidation(notExistField, model, new GetOneCustomRepository()))
  }
  if (existField && seccondModel) {
    validations.push(new FieldNotFoundValidation(existField, seccondModel, new GetOneCustomRepository()))
  }
  return new ValidationComposite(validations)
}
