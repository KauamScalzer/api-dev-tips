import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols/validation'

export class CompareFieldValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {}

  validate (data: any): Error {
    if (data[this.fieldName] !== data[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
  }
}
