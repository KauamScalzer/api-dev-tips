import { CantExistValidation, FieldCompareValidation, HaveToExistValidation } from '.'

export interface Validators {
  requiredFields: string[]
  compareFields?: FieldCompareValidation
  email?: string
  cantExist?: CantExistValidation[]
  haveToExist?: HaveToExistValidation[]
}
