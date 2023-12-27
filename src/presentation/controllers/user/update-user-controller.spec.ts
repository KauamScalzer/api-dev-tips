import { UpdateUserController } from './update-user-controller'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'
import { IUpdateUser } from '@/domain/usecases/user'
import { serverError, badRequest, noContent } from '@/presentation/helpers/http'

const makeUpdateUser = (): IUpdateUser => {
  class UpdateUserStub implements IUpdateUser {
    async update (data: IUpdateUser.Params): Promise<void> {}
  }
  return new UpdateUserStub()
}

const makeFakeRequest = (): UpdateUserController.Params => ({
  id: 1,
  name: 'any_name',
  email: 'any_email'
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (data: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: UpdateUserController
  updateUserStub: IUpdateUser
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const updateUserStub = makeUpdateUser()
  const validationStub = makeValidation()
  const sut = new UpdateUserController(validationStub, updateUserStub)
  return {
    sut,
    updateUserStub,
    validationStub
  }
}

describe('UpdateUserController', () => {
  test('Should call IUpdateUser with correct values', async () => {
    const { sut, updateUserStub } = makeSut()
    const createSpy = jest.spyOn(updateUserStub, 'update')
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Should return 500 if IUpdateUser throws', async () => {
    const { sut, updateUserStub } = makeSut()
    jest.spyOn(updateUserStub, 'update').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('any_error')))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 400 if Validation returns an Error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
