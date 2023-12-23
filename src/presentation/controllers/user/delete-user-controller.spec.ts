import { DeleteUserController } from './delete-user-controller'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'
import { IDeleteUser } from '@/domain/usecases/user'
import { serverError, badRequest, noContent } from '@/presentation/helpers/http'

const makeDeleteUser = (): IDeleteUser => {
  class DeleteUserStub implements IDeleteUser {
    async delete (data: IDeleteUser.Params): Promise<void> {}
  }
  return new DeleteUserStub()
}

const makeFakeRequest = (): DeleteUserController.Params => ({
  id: 1
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
  sut: DeleteUserController
  deleteUserStub: IDeleteUser
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const deleteUserStub = makeDeleteUser()
  const validationStub = makeValidation()
  const sut = new DeleteUserController(validationStub, deleteUserStub)
  return {
    sut,
    deleteUserStub,
    validationStub
  }
}

describe('DeleteUserController', () => {
  test('Should call IDeleteUser with correct values', async () => {
    const { sut, deleteUserStub } = makeSut()
    const createSpy = jest.spyOn(deleteUserStub, 'delete')
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Should return 500 if IDeleteUser throws', async () => {
    const { sut, deleteUserStub } = makeSut()
    jest.spyOn(deleteUserStub, 'delete').mockImplementationOnce(async () => {
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
