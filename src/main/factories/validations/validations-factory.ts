import { EmailValidatorAdapter } from '@/main/adapters/validators'
import { ValidationComposite, RequiredFieldValidation, EmailValidation, CompareFieldValidation, FieldInUseValidation, FieldNotFoundValidation } from '@/main/validators'
import { Validation } from '@/presentation/protocols'
import { GetOneCustomRepository } from '@/infra/db/repositories/validation'
import { Validators } from '@/presentation/protocols/validators'

export const makeValidations = (data: Validators): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of data.requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  if (data.compareFields) {
    validations.push(new CompareFieldValidation(data.compareFields.field, data.compareFields.fieldToCompare))
  }
  if (data.email) {
    validations.push(new EmailValidation(data.email, new EmailValidatorAdapter()))
  }
  if (data.cantExist) {
    for (const item of data.cantExist) {
      validations.push(new FieldInUseValidation(item.fieldName, item.model, new GetOneCustomRepository()))
    }
  }
  if (data.haveToExist) {
    for (const item of data.haveToExist) {
      validations.push(new FieldNotFoundValidation(item.fieldName, item.model, new GetOneCustomRepository()))
    }
  }
  return new ValidationComposite(validations)
}
