interface FieldComparison {
  field: string
  fieldToCompare: string
}

interface NotExistFieldValidation {
  fieldName: string
  model: any
}

interface ExistFieldValidation {
  fieldName: string
  model: any
}

export interface Validators {
  requiredFields: string[]
  compareFields?: FieldComparison
  email?: string
  cantExist?: NotExistFieldValidation[]
  haveToExist?: ExistFieldValidation[]
}
