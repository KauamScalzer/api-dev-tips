import { EmailValidatorAdapter } from '@/main/adapters/validators'
import { ValidationComposite, RequiredFieldValidation, EmailValidation, CompareFieldValidation, FieldInUseValidation, FieldNotFoundValidation } from '@/main/validators'
import { Validation } from '@/presentation/protocols'
import { GetOneCustomRepository } from '@/infra/db/repositories/validation'

export interface FieldComparison {
  field: string
  fieldToCompare: string
}

export interface ExistFieldValitation {
  field: string
  model: any
}

export interface NotExistFieldValitation {
  field: string
  model: any
}

export const makeValidations = (requiredFields: string[], compareFields?: FieldComparison, email?: string, notExistField?: NotExistFieldValitation, existField?: ExistFieldValitation): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  if (compareFields) {
    validations.push(new CompareFieldValidation(compareFields.field, compareFields.fieldToCompare))
  }
  if (email) {
    validations.push(new EmailValidation(email, new EmailValidatorAdapter()))
  }
  if (notExistField) {
    validations.push(new FieldInUseValidation(notExistField.field, notExistField.model, new GetOneCustomRepository()))
  }
  if (existField) {
    validations.push(new FieldNotFoundValidation(existField.field, existField.model, new GetOneCustomRepository()))
  }
  return new ValidationComposite(validations)
}
