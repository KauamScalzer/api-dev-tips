import { GetOneUserController } from './get-one-user-controller'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { HttpRequest, Validation } from '@/presentation/protocols'
import { IGetOneUser } from '@/domain/usecases/user'
import { serverError, badRequest, ok } from '@/presentation/helpers/http'

const makeGetOneUser = (): IGetOneUser => {
  class GetOneUserStub implements IGetOneUser {
    async getOne (data: number): Promise<any> {
      return {
        id: 'any_id',
        name: 'any_name'
      }
    }
  }
  return new GetOneUserStub()
}

const makeFakeRequest = (): HttpRequest => ({
  params: {
    id: 'any_id'
  }
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
  sut: GetOneUserController
  getOneUserStub: IGetOneUser
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const getOneUserStub = makeGetOneUser()
  const validationStub = makeValidation()
  const sut = new GetOneUserController(validationStub, getOneUserStub)
  return {
    sut,
    getOneUserStub,
    validationStub
  }
}

describe('GetOneUserController', () => {
  test('Should call IGetOneUser with correct values', async () => {
    const { sut, getOneUserStub } = makeSut()
    const createSpy = jest.spyOn(getOneUserStub, 'getOne')
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.params)
  })

  test('Should return 500 if IGetOneUser throws', async () => {
    const { sut, getOneUserStub } = makeSut()
    jest.spyOn(getOneUserStub, 'getOne').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('any_error')))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({
      id: 'any_id',
      name: 'any_name'
    }))
  })

  test('Should return 400 if Validation returns an Error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
