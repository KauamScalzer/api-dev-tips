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

export const makeValidations = (requiredFields: string[], compareFields?: FieldComparison, email?: string, notExistField?: NotExistFieldValitation[], existField?: ExistFieldValitation[]): ValidationComposite => {
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
    for (const item of notExistField) {
      validations.push(new FieldInUseValidation(item.field, item.model, new GetOneCustomRepository()))
    }
  }
  if (existField) {
    for (const item of existField) {
      validations.push(new FieldNotFoundValidation(item.field, item.model, new GetOneCustomRepository()))
    }
  }
  return new ValidationComposite(validations)
}
