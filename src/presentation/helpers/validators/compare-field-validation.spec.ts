import { InvalidParamError } from '../../errors'
import { CompareFieldValidation } from './compare-field-validation'

const makeSut = (): CompareFieldValidation => {
  return new CompareFieldValidation('field', 'fieldToCompare')
}

describe('CompareFieldValidation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'wrong_value'
    })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return if validation suceceds', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'any_value'
    })
    expect(error).toBeFalsy()
  })
})
