import { CompareFieldValidation, FieldInUseValidation, FieldNotFoundValidation, RequiredFieldValidation } from '@/main/validators'
import { Validation, EmailValidator } from '@/presentation/protocols'
import { makeValidations } from './validations-factory'
import { ValidationComposite } from '@/main/validators/validation-composite'
import { EmailValidation } from '@/main/validators/email-validation'
import { Lesson, User } from '@/infra/db/typeorm/models'
import { IGetOneCustomRepository } from '@/data/protocols/db/validations'
import { Validators } from '@/presentation/protocols/validators'

jest.mock('@/main/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeGetOneCustomRepository = (): IGetOneCustomRepository => {
  class GetOneCustomRepositoryStub implements IGetOneCustomRepository {
    async getOne (data: IGetOneCustomRepository.Params, model: any): Promise<IGetOneCustomRepository.Result> {}
  }
  return new GetOneCustomRepositoryStub()
}

describe('makeValidations factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    const validators: Validators = {
      requiredFields: ['name', 'email'],
      compareFields: { field: 'password', fieldToCompare: 'confirmPassword' },
      email: 'email',
      cantExist: [{ fieldName: 'email', model: User }],
      haveToExist: [{ fieldName: 'userId', model: User }, { fieldName: 'lessonId', model: Lesson }]
    }
    makeValidations(validators)
    const validations: Validation[] = []
    for (const field of validators.requiredFields) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation(validators.compareFields.field, validators.compareFields.fieldToCompare))
    validations.push(new EmailValidation(validators.email, makeEmailValidator()))
    if (validators.cantExist) {
      for (const item of validators.cantExist) {
        validations.push(new FieldInUseValidation(item.fieldName, item.model, makeGetOneCustomRepository()))
      }
    }
    if (validators.haveToExist) {
      for (const item of validators.haveToExist) {
        validations.push(new FieldNotFoundValidation(item.fieldName, item.model, makeGetOneCustomRepository()))
      }
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
